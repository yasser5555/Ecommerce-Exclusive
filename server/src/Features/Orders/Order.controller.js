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

module.exports = {
  CreateOrders,
  GetOrders,
  getTotalPayment,
};
