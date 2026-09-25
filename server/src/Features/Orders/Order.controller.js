const orderServices = require("./Order.services");

const CreateOrders = async (req, res) => {
  try {
    const result = await orderServices.CreateOrders(
      req.user.id,
      req.body.address_id,
      req.body.status,
      req.body.products,
      req.body.card_id,
    );

    res.status(201).json({
      msg: "Order Created Successfully",
      result,
    });

  } catch (error) {
    res.status(500).json({
      msg: "Error at Orders.Controller.CreateOrders",
      error: error.message,
    });
  }
};

const GetOrders = async (req, res) => {
  try {
    const data = await orderServices.GetOrders(req.user.id);
    res.status(200).json({
      msg: "Data Fetched Successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error at Orders.Controller.GetOrders",
      error: error.message,
    });
  }
};

const getTotalPayment = async (req, res) => {
  try {
    const result = await orderServices.getTotalPayment(
      req.body.order_id,
      req.user.id,
    );

    res.status(200).json({
      msg: "Total Payment Fetched Successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error at Orders.Controller.getTotalPayment",
      error: error.message,
    });
  }
};

// Controller to search product within orders
const search_Order = async (req, res) => {
  try {
    // Extract title from query parameters or request body
    const title = req.query.title || req.query.q || req.body?.title;
    // Extract optional order_id from query parameters or request body
    const order_id = req.query.order_id || req.body?.order_id;
    // Call service to perform search
    const data = await orderServices.search_Order(title, order_id);
    // Send success response with matched orders
    res.status(200).json({
      msg: "Orders Fetched Successfully",
      data,
    });
  } catch (error) {
    // Send error response on failure
    res.status(500).json({
      msg: "Error at Orders.Controller.search_Order",
      error: error.message,
    });
  }
};

// Controller to get order details
const getOrderDetails = async (req, res) => {
  try {
    // Extract order_id from route params, query, or request body
    const order_id = req.params.id || req.params.order_id || req.query.order_id || req.body?.order_id;
    // Call service to get order details
    const data = await orderServices.getOrderDetails(order_id);
    // Send success response with order details
    res.status(200).json({
      msg: "Order Details Fetched Successfully",
      data,
    });
  } catch (error) {
    // Send error response on failure
    res.status(500).json({
      msg: "Error at Orders.Controller.getOrderDetails",
      error: error.message,
    });
  }
};

module.exports = {
  CreateOrders,
  GetOrders,
  getTotalPayment,
  getOrderDetails,
  search_Order,
};
