const express = require("express");
const router = express.Router();
const { protect } = require("../../shared/Middleware/auth.middleware");
const ProductController = require("./Product.controller");

router.get("/", protect, ProductController.getAllProducts);
router.get("/product/:id", protect, ProductController.getProductById);
router.get("/search", protect, ProductController.findProductByTitle);
router.get("/catogeries", protect, ProductController.GetCatogeries);
 module.exports = router;
