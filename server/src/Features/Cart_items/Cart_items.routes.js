const express = require("express");
const router = express.Router();
const { protect } = require("../../shared/Middleware/auth.middleware");
const cartController = require("./Cart_items.controller");

// Read cart
router.get("/", protect, cartController.getCart);
// Create / Add product
router.post("/add_to_cart", protect, cartController.createCartItem);
// Increase / Decrease quantity
router.patch("/modify_cart", protect, cartController.updateCartItem);
// Delete one cart item
router.delete("/delete_item", protect, cartController.deleteCartItem);
// Clear entire cart
router.delete("/clear_cart", protect, cartController.clearCart);

module.exports = router;
