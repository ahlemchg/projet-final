const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    name: { type: String }, // For compatibility with Hubmarket/admin
    desc: { type: String, required: true },
    description: { type: String }, // For compatibility with Hubmarket/admin
    img: { type: Array, required: true },
    image: { type: String }, // For compatibility with Hubmarket/admin
    categories: { type: Array },
    category: { type: String }, // For compatibility with Hubmarket/admin
    size: { type: Array },
    color: { type: Array },
    brand: { type: String, default: "" },
    price: { type: Number, required: true },
    oldPrice: { type: Number }, // For compatibility with Hubmarket/admin
    countInStock: { type: Number, required: true, default: 0 },
    inStock: { type: Boolean, default: true },
    sale: { type: Boolean, default: false }, // For compatibility with Hubmarket/admin
    ratings: [
      {
        userId: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
      },
    ],
    ratingAvg: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);