const express = require("express");
const router = express.Router();
const {
  authUser,
  registerUser,
  getUserProfile,
  getUsers,
} = require("../controllers/user.controller");
const { protect, admin } = require("../middlewares/auth.middleware");

router.post("/", registerUser);
router.get("/", protect, admin, getUsers);
router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);

module.exports = router;
