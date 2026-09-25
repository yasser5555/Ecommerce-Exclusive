import { create } from "zustand";
import { getOrderDetailsAPI, getOrderPageAPI } from "../Api/Orders.api";

export const useOrdersStore = create((set) => ({
  orders: [],
  loading: false,
  error: null,
  selectedOrder: null,
  orderDetailLoading: false,
  orderDetailError: null,

  fetchOrderStatistics: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getOrderPageAPI();
      set({ orders: Array.isArray(data) ? data : [], loading: false, error: null });
      return data;
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || "Failed to fetch orders";

      console.error(`error at Orders.store.fetchOrderStatistics: ${message}`);
      set({ loading: false, error: message });
      throw error;
    }
  },

  fetchOrderDetails: async (orderId) => {
    if (!orderId) {
      set({ selectedOrder: null, orderDetailLoading: false, orderDetailError: null });
      return null;
    }

    set({ orderDetailLoading: true, orderDetailError: null });

    try {
      const data = await getOrderDetailsAPI(orderId);
      const order = Array.isArray(data) ? data[0] ?? null : data ?? null;

      set({ selectedOrder: order, orderDetailLoading: false, orderDetailError: null });
      return order;
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || "Failed to fetch order details";

      console.error(`error at Orders.store.fetchOrderDetails: ${message}`);
      set({ selectedOrder: null, orderDetailLoading: false, orderDetailError: message });
      throw error;
    }
  },
}));
