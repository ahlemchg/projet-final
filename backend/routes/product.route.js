const express = require("express");
const router = express.Router();
const {
  getProducts,
  addProduct,
  updateProduct,
  toggleStatus,
  deleteProduct,
  seedProducts
} = require("../controllers/product.controller");

router.get("/", getProducts);
router.post("/", addProduct);
router.get("/seed", seedProducts);
router.put("/:id", updateProduct);
router.patch("/:id/status", toggleStatus);
router.delete("/:id", deleteProduct);

module.exports = router;
