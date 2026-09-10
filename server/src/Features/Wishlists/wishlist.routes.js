const express = require("express");
const WishlistController = require("./wishlist.controller");
const router = express.Router();
const { protect } = require("../../shared/Middleware/auth.middleware");

// Get user's wishlist
router.get("/", protect, WishlistController.getUserWishlist);
// Add product to wishlist
router.post("/", protect, WishlistController.addToWishlist);
// Remove product from wishlist
router.delete("/:product_id", protect, WishlistController.removeFromWishlist);
module.exports = router;
