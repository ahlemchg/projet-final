const Stripe = require("stripe");

const normalizePrice = (value) => {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = parseFloat(value.replace("$", "").trim());
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

const isHttpUrl = (value) => {
  if (typeof value !== "string") return false;
  return value.startsWith("http://") || value.startsWith("https://");
};

const createStripeCheckoutSession = async (req, res) => {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json("Stripe secret key is missing (STRIPE_SECRET_KEY).");
    }

    if (!process.env.STRIPE_SECRET_KEY.startsWith("sk_")) {
      return res
        .status(500)
        .json(
          "STRIPE_SECRET_KEY doit être une clé secrète Stripe (commence par sk_), pas une clé publishable (pk_).",
        );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const origin = req.headers.origin || "http://localhost:5173";
    const cartItems = Array.isArray(req.body.cartItems) ? req.body.cartItems : [];
    if (!cartItems.length) return res.status(400).json("Cart is empty.");

    const line_items = cartItems.map((item) => {
      const unit = normalizePrice(item.price);
      const unitAmount = Math.round(unit * 100);
      if (!Number.isFinite(unitAmount) || unitAmount < 1) {
        throw new Error(`Prix invalide pour "${item?.name || "Product"}".`);
      }
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name || "Product",
            ...(isHttpUrl(item.image) ? { images: [item.image] } : {}),
          },
          unit_amount: unitAmount,
        },
        quantity: item.quantity || 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${origin}/checkout?stripe=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?stripe=cancelled`,
      metadata: {
        userId: String(req.user.id || ""),
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    return res.status(500).json(err?.message || err);
  }
};

module.exports = { createStripeCheckoutSession };

