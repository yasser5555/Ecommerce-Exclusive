import axiosInstance from "../../../../shared/services/axiosInstance";
export const CreateOrder = async ({
  address_id,
  status,
  products,
  card_id,
}) => {
  try {
    const response = await axiosInstance.post("/orders/", {
      address_id,
      status,
      products,
      card_id,
    });
    return response.data;
  } catch (error) {
    console.error(`there's an error at Create order-api ${error}`);
  }
};

export const CreateOrderHistory = async ({
  order_id,
  product_id,
  quantity,
  price,
}) => {
  try {
    const response = await axiosInstance.post("/orders/history", {
      order_id,
      product_id,
      quantity,
      price,
    });
    return response.data;
  } catch (error) {
    console.error(`there's an error at Create.Order.History-api ${error}`);
  }
};

export const getOrders = async () => {
  try {
    const response = await axiosInstance.get("/orders/", {});
    return response.data;
  } catch (error) {
    console.error(`there's an error at Get order-api ${error}`);
  }
};

export const payOrder = async ({ order_id, card_id }) => {
  try {
    const response = await axiosInstance.post("/orders/pay", {
      order_id,
      card_id,
    });

    return response.data;
  } catch (error) {
    console.error(`There's an error at payOrder API: ${error.message}`);

    throw error;
  }
};

// Search orders containing product by title or within order_id
export const searchOrders = async ({ title, order_id }) => {
  try {
    // Send GET request to orders search endpoint with query params
    const response = await axiosInstance.get("/orders/search", {
      params: {
        title: title || undefined,
        order_id: order_id || undefined,
      },
    });
    // Return response data

    return response.data;
  } catch (error) {
    // Log error message to console
    console.error(`There's an error at searchOrders API: ${error.message}`);
    // Rethrow error for calling code to handle
    throw error;
  }
};

// Get order details by order_id
export const getOrderDetails = async (order_id) => {
  try {
    // Send GET request to fetch order details by order_id
    const response = await axiosInstance.get(`/orders/details/${order_id}`);
    // Return response data

     console.log(`Current Response From api is ${response.data}`);
    
    return response.data;
  } catch (error) {
    // Log error message to console
    console.error(`There's an error at getOrderDetails API: ${error.message}`);
    // Rethrow error for calling code to handle
    throw error;
  }
};
