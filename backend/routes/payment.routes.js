const router = require("express").Router();
const { verifyToken } = require("../middlewares/verifyToken");
const { createStripeCheckoutSession } = require("../controllers/payment.controller");

router.post("/stripe/create-checkout-session", verifyToken, createStripeCheckoutSession);

module.exports = router;

