import { create } from "zustand";
import {
  createProductReviewRequest,
  filterData,
  getAllProduct,
  GetCatogeries,
  getProductByID,
  getProductReviewsRequest,
  searchProducts,
} from "../api/Product.api";

export const useProductStore = create((set, get) => ({
  // For Showing Products into pages
  products: [],
  // for Product Page Detials
  productDetails: null,
  // for Dividing products on Pages
  pagination: null,
  isLoading: false,
  error: null,
  // For Searching Products
  searchResults: "",
  // For Showing Catogery in ui
  catogery: [],
  // For Filtering Products based on {Catogery , rating , min & max price}
  filters: {
    Catogery: null,
    rating: null,
    minprice: null,
    maxprice: null,
  },
  reviews: [],

  // Get Product
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
      console.log("PRODUCTS FROM API:", response);
      

      set({
        products: response.data[0],
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
  // Setting a Search Result from Filter-bar ==> Product Page
  getSearchResult: (payload) => {
    set({
      searchResults: payload,
    });
  },
  // Get Catogeries
  getCatogeries: async () => {
    try {
      set({
        isLoading: true,
        error: null,
      });
      const response = await GetCatogeries();
      set({
        catogery: response,
        isLoading: false,
      });
      return response;
    } catch (error) {
      set({
        error: error,
        isLoading: false,
      });
    }
  },

  getFilters: (payload) => {
    set({
      filters: {
        Catogery: payload?.Catogery,
        rating: payload?.rating,
        minprice: payload?.minprice,
        maxprice: payload?.maxprice,
      },
    });
  },

  filterData: async (payload) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const response = await filterData(payload);

      console.log("STORE FILTER RESPONSE:", response);
      console.log("COUNT:", response.length);

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

      throw error;
    }
  },

  fetchReviews: async (productId) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const response = await getProductReviewsRequest(productId);

      set({
        reviews: Array.isArray(response.data) ? response.data : [],
        isLoading: false,
      });

      return response;
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch reviews",
        isLoading: false,
      });

      throw error;
    }
  },
  createReview: async (productId, comment, rating) => {
    try {
      set({ error: null });

      const response = await createProductReviewRequest(
        productId,
        comment,
        rating,
      );

      console.log("CREATE REVIEW RESPONSE:", response);

      await get().fetchReviews(productId);
      console.log("REVIEWS AFTER FETCH:", get().reviews);

      return response;
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to create review",
      });

      throw error;
    }
  },
}));
