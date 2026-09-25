import { create } from "zustand";
import {
  getOrders,
  CreateOrder,
  CreateOrderHistory,
  payOrder,
  searchOrders,
  getOrderDetails,
} from "./../Api/Order.api";

export const useOrderStore = create((set, get) => ({
  // Order Details Page
  orderId: null,

  // For Creating Orders
  order: null,

  // Displaying Order History
  orderHistory: [],

  // Payment result
  payment: null,

  // Indicates that data is loading
  isloading: false,

  // Fetch all orders
  FetchOrder: async () => {
    set({ isloading: true });

    try {
      const response = await getOrders();

      const orders = Array.isArray(response?.data) ? response.data : [];

      console.log("FINAL ORDERS:", orders);

      set({
        orderHistory: orders,
        isloading: false,
      });

      return orders;
    } catch (error) {
      console.error("FetchOrder Error:", error.response?.data || error.message);

      set({ isloading: false });

      throw error;
    }
  },

  // Create new order
  CreateOrder: async ({ address_id, status, products, card_id }) => {
    set({
      isloading: true,
    });

    try {
      const response = await CreateOrder({
        address_id,
        status,
        products,
        card_id,
      });

      set({
        order: response,
        isloading: false,
      });

      return response;
    } catch (error) {
      console.error(`error at CreateOrder Store: ${error.message}`);

      set({
        isloading: false,
      });

      throw error;
    }
  },

  // Create order history
  CreateOrderHistory: async ({ order_id, product_id, quantity, price }) => {
    set({
      isloading: true,
    });

    try {
      const response = await CreateOrderHistory({
        order_id,
        product_id,
        quantity,
        price,
      });

      set({
        order: response,
        isloading: false,
      });

      console.log(`order-state is ${JSON.stringify(get().order)}`);

      return response;
    } catch (error) {
      console.error(`error at CreateOrderHistory Store: ${error.message}`);

      set({
        isloading: false,
      });

      throw error;
    }
  },

  // Pay order
  PayOrder: async ({ order_id, card_id }) => {
    set({
      isloading: true,
    });

    try {
      const response = await payOrder({
        order_id,
        card_id,
      });

      set({
        payment: response,
        isloading: false,
      });

      return response;
    } catch (error) {
      console.error(`error at PayOrder Store: ${error.message}`);

      set({
        isloading: false,
      });

      throw error;
    }
  },

  // Search orders by product title or order ID
  SearchOrders: async (title, order_id) => {
    set({
      isloading: true,
    });

    try {
      const response = await searchOrders({
        title,
        order_id,
      });

      // Extract orders from API response
      const orders = Array.isArray(response?.data?.[0]) ? response.data[0] : [];

      set({
        orderHistory: orders,
        isloading: false,
      });

      console.log("Search Result:", orders);

      return orders;
    } catch (error) {
      console.error(`error at SearchOrders Store: ${error.message}`);

      set({
        isloading: false,
      });

      throw error;
    }
  },

  // Fetch single order details
  FetchOrderDetails: async (order_id) => {
    set({
      isloading: true,
    });

    try {
      const response = await getOrderDetails(order_id);

      set({
        order: response,
        orderId: order_id,
        isloading: false,
      });

      return response;
    } catch (error) {
      console.error(`error at FetchOrderDetails Store: ${error.message}`);

      set({
        isloading: false,
      });

      throw error;
    }
  },
}));
