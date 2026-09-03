import { create } from "zustand";
import {
  getAllProduct,
  getByProductID,
  getProductByID,
} from "../api/Product.api";

export const useProductStore = create((set) => ({
  products: null,
  productDetails: null,
  pagination: null,
  isLoading: false,
  error: null,
  FetchProducts: async ({ page, limit }) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const response = await getAllProduct({
        page,
        limit,
      });

      set({
        products: response.data,
        pagination: response.pagination,
        isLoading: false,
      });

      return response;
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
      });

      throw error;
    }
  },
  getproductDetials: async (payload) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const response = await getProductByID(payload);

      set({
        productDetails: response,
        isLoading: false,
      });

      return response;
    } catch (error) {
      set({
        error: error,
        isLoading: false,
      });

      console.error(error);
      throw error;
    }
  },
}));
