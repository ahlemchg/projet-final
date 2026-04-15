const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectDB = require("./config/db");
const User = require("./models/user.model");
const CryptoJS = require("crypto-js");

// Routes
const authRoute = require("./routes/auth.routes");
const userRoute = require("./routes/user.routes");
const productRoute = require("./routes/product.routes");
const cartRoute = require("./routes/cart.routes");
const orderRoute = require("./routes/order.routes");
const statsRoute = require("./routes/stats.routes");
const wishlistRoute = require("./routes/wishlist.routes");
const faqRoute = require("./routes/faq.routes");
const couponRoute = require("./routes/coupon.routes");
const newsletterRoute = require("./routes/newsletter.routes");
const paymentRoute = require("./routes/payment.routes");
const contactRoute = require("./routes/contact.routes");

// Initialize Admin User
const initAdmin = async () => {
  try {
    const adminUsername = "admin";
    const adminEmail = "admin@hubmarket.com";
    console.log(
      "Initializing admin with PASS_SEC starting with:",
      process.env.PASS_SEC?.substring(0, 3),
    );
    const encryptedPassword = CryptoJS.AES.encrypt(
      "Admin123!",
      process.env.PASS_SEC,
    ).toString();

    // Check if any admin exists
    const admin = await User.findOne({ isAdmin: true });

    if (!admin) {
      const newAdmin = new User({
        username: adminUsername,
        email: adminEmail,
        password: encryptedPassword,
        isAdmin: true,
      });
      await newAdmin.save();
      console.log(`Admin account created: ${adminUsername} / Admin123!`);
    } else {
      // Update existing admin to new credentials if they are different
      admin.username = adminUsername;
      admin.email = adminEmail;
      admin.password = encryptedPassword;
      admin.isAdmin = true; // Ensure it's still true
      await admin.save();
      console.log(`Admin account updated: ${adminUsername} / Admin123!`);
    }
  } catch (err) {
    console.error("Admin initialization error:", err);
  }
};

// Start Server function
const startServer = async () => {
  try {
    // Database Connection
    await connectDB();

    // Initialize Admin User
    await initAdmin();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Backend server is running on port ${PORT}!`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
};

// Middlewares
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "token",
      "Accept",
      "X-Requested-With",
    ],
  }),
);
// No need for app.options('*', cors()) as cors() middleware handles it if placed first.

// Body Parser with JSON Syntax Error Handler
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  express.json({ limit: "50mb" })(req, res, (err) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
      console.error("JSON Syntax Error:", err.message);
      return res
        .status(400)
        .json({ message: "Invalid JSON format in request body." });
    }
    next();
  });
});

app.use(express.urlencoded({ limit: "50mb", extended: true }));

// API Endpoints
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/stats", statsRoute);
app.use("/api/wishlist", wishlistRoute);
app.use("/api/faq", faqRoute);
app.use("/api/coupons", couponRoute);
app.use("/api/newsletter", newsletterRoute);
app.use("/api/payments", paymentRoute);
app.use("/api/contact", contactRoute);

// Catch-all 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found." });
});

// Final Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});

startServer();
