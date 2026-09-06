import { create } from "zustand";
import {
  getAllProduct,
  getByProductID,
  getProductByID,
  searchProducts,
} from "../api/Product.api";

export const useProductStore = create((set) => ({
  products: [],
  productDetails: null,
  pagination: null,
  isLoading: false,
  error: null,
  // Data is Array of Object where Object represent Product
  searchResults: "",
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
  productSearch: async (payload) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const response = await searchProducts(payload);

      console.log("SEARCH RESPONSE:", response);
      console.log("IS ARRAY:", Array.isArray(response));
      console.log("SEARCH LENGTH:", response.length);

      set({
        products: response,
        isLoading: false,
      });

      console.log("PRODUCTS UPDATED:", response);

      return response;
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
      });

      console.error(error);
      throw error;
    }
  },
  getSearchResult: (payload) => {
    set({
      searchResults: payload,
    });
  },
}));
