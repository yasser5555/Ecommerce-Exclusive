const AdminController = require("./Admin.controller");
const express = require("express");
const router = express.Router();

const { protect } = require("../../shared/Middleware/auth.middleware");
const upload = require("../../shared/Middleware/upload.middleware");

router.get("/all_product",protect,AdminController.getAllProductController);
router.get("/",protect,AdminController.getAdminDashboardController);
router.get("/product_page",protect,AdminController.getAdminProductPageController);
router.get("/low_stock",protect,AdminController.deleteProductController);
router.get("/out_of_stock",protect,AdminController.getOutOfStockController);

router.patch("/",protect,AdminController.update_ProductController);

router.post("/product",protect, upload.single("product_image"),AdminController.createProductController);
router.post("/search_product",protect,AdminController.Search_ProductController);
router.post("/delete_product",protect,AdminController.deleteProductController);

module.exports = router