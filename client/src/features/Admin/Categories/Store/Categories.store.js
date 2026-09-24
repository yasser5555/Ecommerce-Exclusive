import { create } from "zustand";

import {
  getCategoryStatisAPI,
  Update_categoryAPI,
  create_categoryAPI,
  delete_categoryAPI,
} from "../Api/Categories.api";

export const useCategoriesStore = create((set , get) => ({
  // Stores the category page data returned from the API
  category: null,
  // Stores the loading state for category operations
  loading: false,
  // Fetches category statistics and category page data
  fetchCategoryStatistics: async () => {
    set({ loading: true });
    try {
      const data = await getCategoryStatisAPI();
      set({
        category: data,
        loading: false,
      });
      return data;
    } catch (error) {
      console.error(
        `error at Categories.store.fetchCategoryStatistics: ${error}`,
      );
      set({
        loading: false,
      });
    }
  },
  // Updates an existing category name
  updateCategory: async (newName, category_id) => {
    set({ loading: true });
    try {
      const data = await Update_categoryAPI(newName, category_id);
      set({
        loading: false,
      });
      return data;
    } catch (error) {
      console.error(`error at Categories.store.updateCategory: ${error}`);
      set({
        loading: false,
      });
    }
  },
  // Creates a new category
  createCategory: async (Name) => {
    set({ loading: true });
    try {
      const data = await create_categoryAPI(Name);
      set({
        loading: false,
      });
      const {fetchCategoryStatistics} = get().fetchCategoryStatistics
      await fetchCategoryStatistics()
      return data;
    } catch (error) {
      set({
        loading: false,
      });
      console.error(`error at Categories.store.createCategory: ${error}`);
    }
  },
  // Soft deletes a category
  deleteCategory: async (category_id) => {
    set({ loading: true });
    try {
      const data = await delete_categoryAPI(category_id);
      set({
        loading: false,
      });
      return data;
    } catch (error) {
      console.error(`error at Categories.store.deleteCategory: ${error}`);
      set({
        loading: false,
      });
    }
  },
}));
