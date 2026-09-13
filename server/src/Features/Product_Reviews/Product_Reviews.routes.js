const express = require("express");
const {
  getProductReviews,
  createReview,
  deleteReview,
} = require("./Product_Reviews.controller");
const { protect } = require("../../shared/Middleware/auth.middleware");
const router = express.Router();
// GET product reviews
router.get("/product/:productId", protect, getProductReviews);
router.post("/product/:productId", protect, createReview);
router.delete("/product/:reviewId", protect, deleteReview);

module.exports = router;