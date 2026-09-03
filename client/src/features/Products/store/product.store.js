import { create } from "zustand";
import {
  getAllProduct,
  getByProductID,
  getProductByID,
} from "../api/Product.api";

export const useProductStore = create((set) => ({
  products: null,
  productDetails: null,
  isLoading: false,
  error: null,
  FetchProducts: async () => {
    try {
      set({
        isLoading: true,
        error: null,
      });
      const response = await getAllProduct();
      set({
        products: response,
        isLoading: false,
      });
      return response;
    } catch (error) {
      set({
        error: error,
        isLoading: false,
      });
      console.error(error);
    }
  },
  getproductDetials: async (payload) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const response = await getProductByID(payload);

      console.log("STORE RESPONSE:", response);

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
      throw error; // مهم
    }
  },
}));
