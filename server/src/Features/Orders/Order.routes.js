const express = require("express");

const OrdersController = require("./Order.Controller");

const { protect } = require("../../shared/Middleware/auth.middleware");

const router = express.Router();
router.post("/", protect, OrdersController.CreateOrders);
router.post("/history", protect, OrdersController.CreateOrderHistroy);
router.get("/", protect, OrdersController.GetOrders);
router.post("/pay", protect, OrdersController.PayOrder);
router.get("/total", protect, OrdersController.getTotalPayment);
module.exports = router;
