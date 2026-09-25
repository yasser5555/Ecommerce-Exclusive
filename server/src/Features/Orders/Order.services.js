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

// Search orders containing product by title or within specific order
const search_Order = async (title, order_id) => {
  try {
    // Call repository to search orders
    const result = await ordersRepo.search_Order(title, order_id);
    // Return search result
    return result;
  } catch (error) {
    // Throw error if service operation fails
    throw new Error(`Error at Orders.Services.search_Order: ${error.message}`);
  }
};

// Get order details by order_id
const getOrderDetails = async (order_id) => {
  try {
    // Call repository to get order details
    const result = await ordersRepo.getOrderDetails(order_id);
    // Return order details result
    return result;
  } catch (error) {
    // Throw error if service operation fails
    throw new Error(`Error at Orders.Services.getOrderDetails: ${error.message}`);
  }
};

module.exports = {
  CreateOrders,
  GetOrders,
  getTotalPayment,
  getOrderDetails,
  search_Order,
};
