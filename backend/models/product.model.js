const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: String, required: true },
  oldPrice: { type: String },
  image: { type: String, required: true },
  sale: { type: Boolean, default: false },
  status: { type: String, default: "Active" },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
