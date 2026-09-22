const ordersRepo = require("./Order.repo");

const CreateOrders = async (
  user_id,
  address_id,
  status,
  products,
  card_id,
) => {
  try {
    const result = await ordersRepo.CreateOrders(
      user_id,
      address_id,
      status,
      products,
      card_id,
    );

    return result;

  } catch (error) {
    throw new Error(
      `Error at Orders.Services.CreateOrders: ${error.message}`,
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

module.exports = {
  CreateOrders,
  GetOrders,
  getTotalPayment,
};
