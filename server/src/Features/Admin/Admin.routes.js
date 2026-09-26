const AdminController = require("./Admin.controller");
const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../../shared/Middleware/auth.middleware");
const uploadProduct = require("../../shared/Middleware/productUpload");

router.get(
  "/all_product",
  protect,
  isAdmin,
  AdminController.getAllProductController,
);
router.get("/", protect, isAdmin, AdminController.getAdminDashboardController);
router.get(
  "/product_page",
  protect,
  isAdmin,
  AdminController.getAdminProductPageController,
);
router.get(
  "/low_stock",
  protect,
  isAdmin,

  AdminController.getLowStockController,
);
router.get(
  "/out_of_stock",
  protect,
  isAdmin,
  AdminController.getOutOfStockController,
);
router.get(
  "/get_catogeries",
  protect,
  isAdmin,
  AdminController.GetCatogeriesController,
);
router.get(
  "/get_category_Page",
  protect,
  isAdmin,
  AdminController.getCatogeryPageController,
);
router.get(
  "/get_order_Page",
  protect,
  isAdmin,
  AdminController.getOrderPageController,
);
router.get(
  "/get_order_details/:order_id",
  protect,
  isAdmin,
  AdminController.getAdminOrderDetailsController,
);

router.patch("/", protect, AdminController.update_ProductController);
router.patch(
  "/Update_category",
  protect,
  isAdmin,
  AdminController.updateCategeryNameController,
);

router.post(
  "/create_product",
  protect,
  isAdmin,
  uploadProduct.single("product_image"),
  AdminController.createProductController,
);
router.post(
  "/search_product",
  protect,
  isAdmin,
  AdminController.Search_ProductController,
);

router.post(
  "/delete_product",
  protect,
  isAdmin,
  AdminController.deleteProductController,
);

router.post(
  "/Create_category",
  protect,
  isAdmin,
  AdminController.CreateCatogeryController,
);

router.post(
  "/Delete_category",
  protect,
  isAdmin,
  AdminController.DeleteCatogeryController,
);

router.get(
  "/get_all_users",
  protect,
  isAdmin,
  AdminController.getallusersController,
);
router.get(
  "/get_active_users",
  protect,
  isAdmin,
  AdminController.getActiveUsersController,
);
router.get(
  "/get_blocked_users",
  protect,
  isAdmin,
  AdminController.getBlockedUsersController,
);
router.get(
  "/get_admin_users",
  protect,
  isAdmin,
  AdminController.getAdminUsersController,
);
router.get(
  "/get_regular_users",
  protect,
  isAdmin,
  AdminController.getRegularUsersController,
);
router.post(
  "/delete_user",
  protect,
  isAdmin,
  AdminController.delete_userController,
);
router.patch(
  "/update_user_status",
  protect,
  isAdmin,
  AdminController.update_user_statusController,
);
router.post(
  "/search_user",
  protect,
  isAdmin,
  AdminController.search_userController,
);
router.patch(
  "/modify_user_role",
  protect,
  isAdmin,
  AdminController.modify_user_roleController,
);

module.exports = router;
