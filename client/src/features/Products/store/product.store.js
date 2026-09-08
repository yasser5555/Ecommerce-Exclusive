import { create } from "zustand";
import {
  getAllProduct,
  getByProductID,
  GetCatogeries,
  getProductByID,
  searchProducts,
} from "../api/Product.api";
export const useProductStore = create((set) => ({
  products: [],
  productDetails: null,
  pagination: null,
  isLoading: false,
  error: null,
  searchResults: "",
  catogery:[],
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

      set({
        products: response,
        isLoading: false,
      });

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

  getCatogeries: async () => {
    try {
      set({
        isLoading: true,
        error: null,
      });
      const response = await GetCatogeries();
       set({
        catogery:response,
        isLoading:false
      })
      return response;
    } catch (error) {
      set({
        error:error,
        isLoading:false
      })
    }
  },
}));
