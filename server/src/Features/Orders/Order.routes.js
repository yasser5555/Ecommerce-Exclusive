const express = require("express");

const OrdersController = require("./Order.Controller");

const { protect } = require("../../shared/Middleware/auth.middleware");

const router = express.Router();
router.post("/", protect, OrdersController.CreateOrders);
 router.get("/", protect, OrdersController.GetOrders);
 router.get("/total", protect, OrdersController.getTotalPayment);
module.exports = router;