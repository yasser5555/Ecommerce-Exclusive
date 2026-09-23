import { create } from "zustand";

import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../api/Wishlist.api";

const useWishlistStore = create((set) => ({
  wishlist: [],
  isLoading: false,
  error: null,

  get_Wishlist: async () => {
    try {
      set({
        isLoading: true,
        error: null,
      });
      const response = await getWishlist();
      set({
        wishlist: response.wishlist[0],
      });
    } catch (error) {
      console.log(
        "4. Wishlist Store: error in get_Wishlist:",
        error.response?.data || error.message,
      );
      set({
        error: error.response?.data?.message || error.message,
      });
    } finally {
      set({
        isLoading: false,
      });
    }
  },

  add_ToWishlist: async (product_id) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const response = await addToWishlist(product_id);

      return response;
    } catch (error) {
      console.log(
        `4. Wishlist Store: error while adding product ${product_id}:`,
        error.response?.data || error.message,
      );

      set({
        error: error.response?.data?.message || error.message,
      });

      throw error;
    } finally {
      set({
        isLoading: false,
      });
    }
  },

  remove_FromWishlist: async (product_id) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const response = await removeFromWishlist(product_id);

      return response;
    } catch (error) {
      console.log(
        `4. Wishlist Store: error while removing product ${product_id}:`,
        error.response?.data || error.message,
      );

      set({
        error: error.response?.data?.message || error.message,
      });

      throw error;
    } finally {
      set({
        isLoading: false,
      });
    }
  },
}));

export default useWishlistStore;
