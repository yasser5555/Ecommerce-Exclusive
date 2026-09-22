const AdminController = require("./Admin.controller");
const express = require("express");
const router = express.Router();

const { protect } = require("../../shared/Middleware/auth.middleware");
const upload = require("../../shared/Middleware/upload.middleware");

router.post("/product",protect, upload.single("product_image"),AdminController.createProductController);

router.get("/product",protect,AdminController.getAllProductController);
router.get("/",protect,AdminController.getAdminDashboardController);

router.patch("/",protect,AdminController.update_ProductController);
router.delete("/",protect,AdminController.deleteProductController);
module.exports = router