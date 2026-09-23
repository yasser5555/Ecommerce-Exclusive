const AdminController = require("./Admin.controller");
const express = require("express");
const router = express.Router();

const { protect } = require("../../shared/Middleware/auth.middleware");
const upload = require("../../shared/Middleware/upload.middleware");
router.post("/product",protect, upload.single("product_image"),AdminController.createProductController);
router.get("/all_product",protect,AdminController.getAllProductController);
router.get("/",protect,AdminController.getAdminDashboardController);
router.patch("/",protect,AdminController.update_ProductController);
router.get("/product_page",protect,AdminController.getAdminProductPageController);
router.post("/search_product",protect,AdminController.Search_ProductController);

module.exports = router