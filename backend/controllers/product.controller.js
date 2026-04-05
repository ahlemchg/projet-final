const Product = require("../models/product.model");

// @desc    Get all products
// @route   GET /api/products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Add a product
// @route   POST /api/products
exports.addProduct = async (req, res) => {
  console.log("Receiving new product:", req.body);
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    console.log("Product saved successfully:", newProduct._id);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Error saving product:", err.message);
    res.status(400).json({ message: err.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Toggle product status
// @route   PATCH /api/products/:id/status
exports.toggleStatus = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.status = product.status === "Active" ? "Inactive" : "Active";
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Seed initial data
// @route   GET /api/products/seed
exports.seedProducts = async (req, res) => {
  try {
    await Product.deleteMany({}); // Clear existing
    const initialProducts = [
      {
        name: "Apple iPad Pro 2 128GB",
        category: "Tablets",
        price: "$2.00",
        oldPrice: "$3.00",
        image: "/product_12.jpg",
        sale: true,
        status: "Active",
      },
      {
        name: "Apple Watch Series 5",
        category: "Watches",
        price: "$16.00",
        oldPrice: "$18.00",
        image: "/product_10.jpg",
        sale: true,
        status: "Active",
      },
      {
        name: "iPhone 11 Pro Max",
        category: "Smartphones",
        price: "$18.00",
        oldPrice: "$20.00",
        image: "/product_11.jpg",
        sale: true,
        status: "Active",
      },
    ];
    await Product.insertMany(initialProducts);
    res.json({ message: "Database seeded with initial products!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
