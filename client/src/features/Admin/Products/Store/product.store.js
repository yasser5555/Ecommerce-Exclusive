import { create } from "zustand";
import { getProductAllAPI, getProductPageDataAPI, SearchProductAPI } from "../Api/AdminProduct.api";

export const useAdminProductStore = create((set,get)=>({
    
  // Product Page Data
  productPage: [],
  // Products-data
  products: [],
  SearchedProduct:[],
  loading: false,

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
})) 