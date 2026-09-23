import { create } from "zustand";
import {
  getHomeData,
  getHomeDataAPI,
  getProductPageDataAPI,
  SearchProductAPI,
} from "../api/admin.api";
import { getProductAllAPI } from "./../api/admin.api";
export const useAdminStore = create((set, get) => ({
  // Home page data
  Dashboard: null,
  // Product Page Data
  productPage: [],
  // Products-data
  products: [],
  SearchedProduct:[],
  loading: false,
  fetchDashBoard: async () => {
    set({
      loading: true,
    });
    try {
      const response = await getHomeDataAPI();
      set({
        Dashboard: response,
        loading: false,
      });

      return response;
    } catch (error) {
      set({
        loading: false,
      });
      console.error(`error at fetchDashBoard ${error}`);
    }
  },
  fetchProductPage: async () => {
    set({
      loading: true,
    });
    try {
      const response = await getProductPageDataAPI();
      set({
        productPage: response,
        loading: false,
      });

      return response;
    } catch (error) {
      set({
        loading: false,
      });
      console.error(`error at fetchDashBoard ${error}`);
    }
  },
  fetchProducts: async () => {
    set({
      loading: true,
    });
    try {
      const response = await getProductAllAPI();
      set({
        products: response,
        loading: false,
      });
      return response;
    } catch (error) {
      set({
        loading: false,
      });
      console.error(`error at fetchDashBoard ${error}`);
    }
  },
  SearchForProducts: async (title) => {
    set({
      loading: true,
    });
    try {
      const response = await SearchProductAPI(title);
      set({
        SearchedProduct: response,
        loading: false,
      });
      return response;
    } catch (error) {
      set({
        loading: false,
      });
      console.error(`error at fetchDashBoard ${error}`);
    }
  },
}));
