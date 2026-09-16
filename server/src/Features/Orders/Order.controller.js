const orderServices = require("./Order.services");

const CreateOrders = async (req, res) => {
  try {
    const result = await orderServices.CreateOrders(
      req.user.id,
      req.body.address_id,
      req.body.total_price,
      req.body.status,
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

const CreateOrderHistroy = async (req, res) => {
  try {
    const result = await orderServices.CreateOrderHistroy(
      req.body.order_id,
      req.body.product_id,
      req.body.quantity,
      req.body.price,
    );
 
    res.status(201).json({
      msg: "Order-history Created Successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error at Orders.Controller.CreateOrderHistroy",
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
const PayOrder = async (req, res) => {
  try {
    const { order_id, card_id } = req.body;

    const user_id = req.user.id;

    const result = await orderServices.PayOrder(
      order_id,
      user_id,
      card_id,
    );

    res.status(200).json({
      msg: "Order Paid Successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Failed to Pay Order",
      error: error.message,
    });
  }
};
module.exports = {
  CreateOrders,
  CreateOrderHistroy,
  GetOrders,
  getTotalPayment,
  PayOrder
};
