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
const upload = require("../middlewares/upload");

router.post("/", verifyTokenAndAdmin, upload.array("images", 10), createProduct);
router.put("/:id", verifyTokenAndAdmin, upload.array("images", 10), updateProduct);
router.patch("/:id/status", toggleStatus);
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);
router.get("/stats", getProductStats);
router.get("/find/:id", getProduct);
router.post("/:id/rate", verifyToken, rateProduct);
router.get("/", getAllProducts);

module.exports = router;
