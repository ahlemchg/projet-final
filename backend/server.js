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

// Initialize Admin User
const initAdmin = async () => {
  try {
    const adminUsername = "admin";
    const adminEmail = "admin@hubmarket.com";
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
    origin: [
      "https://adminmarket-delta.vercel.app",
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:4173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
  }),
);
app.use(express.json());

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
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

startServer();
