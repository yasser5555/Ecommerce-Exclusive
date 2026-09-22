import axiosInstance from "../../../shared/services/axiosInstance";
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
