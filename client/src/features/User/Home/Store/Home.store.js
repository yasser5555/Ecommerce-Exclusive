import { create } from "zustand";
import {
  getRandomDataApi,
  getBestSellingApi,
  getCategoriesApi,
} from "../Api/Home.api.js";
  
export const useHomeStore = create((set, get) => ({
  heroSection: [], // uses getRandomData(4) 
  CatogeriesSection:[], // getCategoriesApi() 
  TrendingSection:[], // getBestSellingApi() 
  RecentySection:[], // uses getRandomData(4)
  FeaturedSection:[], // uses getRandomData(1)
  isLoading: false,
  error: null,

  // Hero → random 4 products
  fetchHeroSection: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await getRandomDataApi(4);
      set({
        heroSection: response?.data || response || [],
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  // Categories
  fetchCategoriesSection: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await getCategoriesApi();
      set({
        CatogeriesSection: response?.data || response || [],
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  // Trending → best selling products
  fetchTrendingSection: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await getBestSellingApi();
      set({
        TrendingSection: response?.data || response || [],
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
      });

      throw error;
    }
  },

  // Recently added → random 4 products
  fetchRecentlySection: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await getRandomDataApi(4);
      set({
        RecentySection: response?.data || response || [],
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
      });

      throw error;
    }
  },
  fetchFeaturedSection: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await getRandomDataApi(1);
      set({
        FeaturedSection: response?.data || response || [],
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
      });
      throw error;
    }
  },
}));
