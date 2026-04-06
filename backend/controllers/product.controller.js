const Product = require("../models/product.model");
const Order = require("../models/order.model");

// Helper to sync fields for compatibility
const syncFields = (data) => {
  if (data.name && !data.title) data.title = data.name;
  if (data.title && !data.name) data.name = data.title;
  if (data.description && !data.desc) data.desc = data.description;
  if (data.desc && !data.description) data.description = data.desc;
  if (data.image && (!data.img || data.img.length === 0))
    data.img = [data.image];
  if (data.img && data.img.length > 0 && !data.image) data.image = data.img[0];
  if (data.category && (!data.categories || data.categories.length === 0))
    data.categories = [data.category];
  if (data.categories && data.categories.length > 0 && !data.category)
    data.category = data.categories[0];
  if (data.isSale !== undefined && data.sale === undefined)
    data.sale = data.isSale;
  if (data.sale !== undefined && data.isSale === undefined)
    data.isSale = data.sale;
  if (data.inStock !== undefined) {
    data.status = data.inStock ? "Active" : "Inactive";
  }
  return data;
};

// CREATE
const createProduct = async (req, res) => {
  const syncedData = syncFields(req.body);
  const newProduct = new Product(syncedData);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE
const updateProduct = async (req, res) => {
  const syncedData = syncFields(req.body);
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: syncedData },
      { new: true },
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

// TOGGLE STATUS (For admin compatibility)
const toggleStatus = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json("Product not found");

    product.inStock = !product.inStock;
    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET PRODUCT
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json("Product not found");

    const productObj = product.toObject();
    productObj.status = productObj.inStock ? "Active" : "Inactive";

    res.status(200).json(productObj);
  } catch (err) {
    res.status(500).json(err);
  }
};

// RATE PRODUCT (only if delivered order exists)
const rateProduct = async (req, res) => {
  const { rating } = req.body;
  const userId = String(req.user?.id || "");
  const productId = String(req.params.id || "");

  const parsedRating = Number(rating);
  if (!userId) return res.status(401).json("You are not authenticated!");
  if (!productId) return res.status(400).json("Missing product id.");
  if (!Number.isFinite(parsedRating) || parsedRating < 1 || parsedRating > 5) {
    return res.status(400).json("Rating must be a number between 1 and 5.");
  }

  try {
    const hasDeliveredOrder = await Order.exists({
      userId,
      status: "delivered",
      "products.productId": productId,
    });

    if (!hasDeliveredOrder) {
      return res
        .status(403)
        .json("You can rate this product only after delivery.");
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json("Product not found");

    const existing = product.ratings?.find((r) => r.userId === userId);
    if (existing) {
      existing.rating = parsedRating;
    } else {
      product.ratings = [...(product.ratings || []), { userId, rating: parsedRating }];
    }

    const count = product.ratings.length;
    const avg =
      count === 0
        ? 0
        : product.ratings.reduce((acc, r) => acc + Number(r.rating || 0), 0) /
          count;

    product.ratingCount = count;
    product.ratingAvg = Math.round(avg * 10) / 10; // 1 decimal

    const saved = await product.save();
    const obj = saved.toObject();
    obj.status = obj.inStock ? "Active" : "Inactive";
    res.status(200).json(obj);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET ALL PRODUCTS
const getAllProducts = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  const qColor = req.query.color;
  const qSize = req.query.size;
  const qBrand = req.query.brand;
  const qSort = req.query.sort;
  const qLimit = req.query.limit;
  const qSearch = req.query.search;

  try {
    let query = {};
    if (qCategory) {
      query.categories = { $in: [qCategory] };
    }
    if (qColor) {
      query.color = { $in: [qColor] };
    }
    if (qSize) {
      query.size = { $in: [qSize] };
    }
    if (qBrand) {
      query.brand = { $regex: `^${qBrand}$`, $options: "i" };
    }
    if (qSearch) {
      query.title = { $regex: qSearch, $options: "i" };
    }

    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice && !isNaN(parseInt(req.query.minPrice))) {
        query.price.$gte = parseInt(req.query.minPrice);
      }
      if (req.query.maxPrice && !isNaN(parseInt(req.query.maxPrice))) {
        query.price.$lte = parseInt(req.query.maxPrice);
      }
      if (Object.keys(query.price).length === 0) delete query.price;
    }

    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else {
      let findQuery = Product.find(query);

      if (qSort === "newest") {
        findQuery = findQuery.sort({ createdAt: -1 });
      } else if (qSort === "asc") {
        findQuery = findQuery.sort({ price: 1 });
      } else if (qSort === "desc") {
        findQuery = findQuery.sort({ price: -1 });
      }

      if (qLimit) {
        findQuery = findQuery.limit(parseInt(qLimit));
      }

      products = await findQuery;
    }

    // Add status field for frontend compatibility
    const productsWithStatus = products.map((p) => {
      const productObj = p.toObject();
      productObj.status = productObj.inStock ? "Active" : "Inactive";
      return productObj;
    });

    res.status(200).json(productsWithStatus);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET PRODUCT STATS (UNIQUE CATEGORIES, COLORS, SIZES)
const getProductStats = async (req, res) => {
  try {
    const products = await Product.find();

    const categories = [
      ...new Set(
        products.flatMap((p) =>
          Array.isArray(p.categories) ? p.categories : [],
        ),
      ),
    ];
    const colors = [
      ...new Set(
        products.flatMap((p) => (Array.isArray(p.color) ? p.color : [])),
      ),
    ];
    const sizes = [
      ...new Set(
        products.flatMap((p) => (Array.isArray(p.size) ? p.size : [])),
      ),
    ];
    const brands = [
      ...new Set(
        products
          .map((p) => (typeof p.brand === "string" ? p.brand.trim() : ""))
          .filter(Boolean),
      ),
    ];
    const totalProducts = products.length;

    res.status(200).json({ categories, colors, sizes, brands, totalProducts });
  } catch (err) {
    console.error("Stats Error:", err);
    res.status(500).json(err);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  toggleStatus,
  getProduct,
  getAllProducts,
  getProductStats,
  rateProduct,
};
