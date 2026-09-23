const AdminController = require("./Admin.controller");
const express = require("express");
const router = express.Router();

const { protect } = require("../../shared/Middleware/auth.middleware");
const uploadProduct = require("../../shared/Middleware/productUpload");

router.get("/all_product", protect, AdminController.getAllProductController);
router.get("/", protect, AdminController.getAdminDashboardController);
router.get(
  "/product_page",
  protect,
  AdminController.getAdminProductPageController,
);
router.get("/low_stock", protect, AdminController.getLowStockController);
router.get("/out_of_stock", protect, AdminController.getOutOfStockController);
router.get("/get_catogeries", protect, AdminController.GetCatogeriesController);

router.patch("/", protect, AdminController.update_ProductController);

router.post(
  "/create_product",
  protect,
  uploadProduct.single("product_image"),
  AdminController.createProductController,
);
router.post(
  "/search_product",
  protect,
  AdminController.Search_ProductController,
);
router.post(
  "/delete_product",
  protect,
  AdminController.deleteProductController,
);

module.exports = router;
