const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/product.model");
const User = require("./models/user.model");
const Coupon = require("./models/coupon.model");
const CryptoJS = require("crypto-js");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull for seeding!"))
  .catch((err) => {
    console.log(err);
  });

const seedProducts = [
  {
    title: "Wild Cosmos blue hoodie",
    desc: "A comfortable blue hoodie with wild cosmos embroidery.",
    img: "/assets/product1-1.jpg",
    categories: ["hoodies", "men", "women"],
    size: ["S", "M", "L", "XL"],
    color: ["blue"],
    price: 23.99,
    inStock: true,
  },
  {
    title: "Pink embroidered slogan hoodie",
    desc: "Soft pink hoodie featuring an embroidered slogan.",
    img: "/assets/product2-1.jpg",
    categories: ["hoodies", "women"],
    size: ["XS", "S", "M"],
    color: ["pink"],
    price: 18.0,
    inStock: true,
  },
  {
    title: "Nike Air Max",
    desc: "Classic Nike Air Max sneakers for everyday comfort.",
    img: "/assets/product3-1.jpg",
    categories: ["shoes", "nike", "men"],
    size: ["40", "41", "42", "43", "44"],
    color: ["white", "black"],
    price: 60.0,
    inStock: true,
  },
  {
    title: "Wooden Bar Stool",
    desc: "Elegant wooden bar stool for your kitchen or bar.",
    img: "/assets/product4-1.jpg",
    categories: ["furniture", "home"],
    size: ["One Size"],
    color: ["brown"],
    price: 60.0,
    inStock: true,
  },
  {
    title: "Digital Product",
    desc: "A high-quality digital product for your needs.",
    img: "/assets/product7-1.jpg",
    categories: ["digital"],
    size: [],
    color: [],
    price: 35.0,
    inStock: true,
  },
  {
    title: "Affiliate Product",
    desc: "An affiliate product recommended by our team.",
    img: "/assets/product8-1.jpg",
    categories: ["affiliate"],
    size: ["M", "L"],
    color: ["gray"],
    price: 18.0,
    inStock: true,
  },
];

const seedData = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(seedProducts);
    console.log("Products seeded successfully!");

    // Seed "WELCOME20" Coupon
    const welcomeCoupon = new Coupon({
      code: "WELCOME20",
      discount: 20,
      discountType: "percentage",
      expiryDate: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1),
      ), // 1 year from now
      isActive: true,
    });
    await welcomeCoupon.save();
    console.log("WELCOME20 Coupon created successfully!");

    // Seed Admin User
    const adminUser = new User({
      username: "admin",
      email: "admin@hubrobe.com",
      password: CryptoJS.AES.encrypt(
        "admin123",
        process.env.PASS_SEC,
      ).toString(),
      isAdmin: true,
      img: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    });
    await adminUser.save();
    console.log("Admin User Created successfully!");
    console.log("Username: admin, Password: admin123");

    console.log("Database Seeded successfully!");
  } catch (err) {
    console.log("Error seeding database:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedData();
