const ordersRepo = require("./Order.repo");

const CreateOrders = async (user_id, address_id, total_price, status) => {
  try {
    const result = await ordersRepo.CreateOrders(
      user_id,
      address_id,
      total_price,
      status,
    );

    return result;
  } catch (error) {
    throw new Error(`Error at Orders.Services.CreateOrders: ${error.message}`);
  }
};

const CreateOrderHistroy = async (order_id, product_id, quantity, price) => {
  try {
    const result = await ordersRepo.CreateOrderHistroy(
      order_id,
      product_id,
      quantity,
      price,
    );

    return result;
  } catch (error) {
    throw new Error(
      `Error at Orders.Services.CreateOrderHistroy: ${error.message}`,
    );
  }
};

const GetOrders = async (user_id) => {
  try {
    const result = await ordersRepo.GetOrders(user_id);
    return result;
  } catch (error) {
    throw new Error(`Error at Orders.Services.GetOrders: ${error.message}`);
  }
};

const getTotalPayment = async (order_id, user_id) => {
  try {
    const result = await ordersRepo.getTotalPayment(order_id, user_id);
    return result;
  } catch (error) {
    throw new Error(
      `Error at Orders.Services.getTotalPayment: ${error.message}`,
    );
  }
};
 

const PayOrder = async (order_id, user_id, card_id) => {
  try {
    const result = await ordersRepo.PayOrder(
      order_id,
      user_id,
      card_id,
    );
    return result;
  } catch (error) {
    throw new Error(`Error at Orders.Service.PayOrder: ${error.message}`);
  }
};
module.exports = {
  CreateOrders,
  CreateOrderHistroy,
  GetOrders,
  getTotalPayment,
  PayOrder
};
