const express = require("express");

const OrdersController = require("./Order.controller");

const { protect } = require("../../shared/Middleware/auth.middleware");

const router = express.Router();
router.post("/", protect, OrdersController.CreateOrders);
 router.get("/", protect, OrdersController.GetOrders);
// Route to get total payment for an order
router.get("/total", protect, OrdersController.getTotalPayment);

// Route to search orders containing product by title
router.get("/search", protect, OrdersController.search_Order);

// Route to get order details by order_id via /details/:id
router.get("/details/:id", protect, OrdersController.getOrderDetails);

 

module.exports = router;