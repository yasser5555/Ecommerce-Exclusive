import { create } from "zustand";
import {
  getOrders,
  CreateOrder,
  CreateOrderHistory,
  payOrder,
} from "./../Api/Order.api";

export const useOrderStore = create((set, get) => ({
  // order Details Page
  orderId: null,
  // For Creating Orders
  order: null,
  // Displaying Order History
  orderHistory: [],
  // Payment result
  payment: null,
  // Indicates that data is loading
  isloading: false,
  FetchOrder: async () => {
    set({
      isloading: true,
    });

    try {
      const response = await getOrders();

      set({
        orderHistory: response,
        isloading: false,
      });

      return response;
    } catch (error) {
      console.error(`error at FetchOrder Store: ${error.message}`);

      set({
        isloading: false,
      });

      throw error;
    }
  },

  CreateOrder: async ({ address_id, total_price, status }) => {
    set({
      isloading: true,
    });

    try {
      const response = await CreateOrder({
        address_id,
        total_price,
        status,
      });

      set({
        order: response,
        orderId: response.result.insertId,
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
}));
