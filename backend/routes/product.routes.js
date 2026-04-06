const router = require("express").Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
  toggleStatus,
  getProduct,
  getAllProducts,
  getProductStats,
  rateProduct,
} = require("../controllers/product.controller");
const { verifyToken, verifyTokenAndAdmin } = require("../middlewares/verifyToken");

router.post("/", verifyTokenAndAdmin, createProduct);
router.put("/:id", verifyTokenAndAdmin, updateProduct);
router.patch("/:id/status", toggleStatus);
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);
router.get("/stats", getProductStats);
router.get("/find/:id", getProduct);
router.post("/:id/rate", verifyToken, rateProduct);
router.get("/", getAllProducts);

module.exports = router;
