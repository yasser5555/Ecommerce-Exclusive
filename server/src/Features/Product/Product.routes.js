const express = require("express");
const router = express.Router();
const { protect } = require("../../shared/Middleware/auth.middleware");
const ProductController = require("./Product.controller");
// Get /
router.get("/", protect, ProductController.getAllProducts);
router.get("/:id", protect, ProductController.getProductById);


module.exports = router;