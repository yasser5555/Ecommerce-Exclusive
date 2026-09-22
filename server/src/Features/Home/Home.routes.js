const express = require("express");

const {
  getRandomProducts,
  getBestSellingProducts,
  getCategories,
} = require("./Home.controller");
const { protect } = require("../../shared/Middleware/auth.middleware");
const router = express.Router();
// Get random products.
router.get("/random", protect, getRandomProducts);
// Get highly rated products.
router.get("/best-selling", protect, getBestSellingProducts);
// Get product categories.
router.get("/categories", protect, getCategories);
module.exports = router;