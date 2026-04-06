const router = require("express").Router();
const {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  getUserStats,
} = require("../controllers/user.controller");
const { register, login } = require("../controllers/auth.controller");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

router.post("/", register);
router.post("/login", login);
router.put("/:id", verifyTokenAndAuthorization, updateUser);
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);
router.get("/find/:id", verifyTokenAndAdmin, getUser);
router.get("/", verifyTokenAndAdmin, getAllUsers);
router.get("/stats", verifyTokenAndAdmin, getUserStats);

module.exports = router;
