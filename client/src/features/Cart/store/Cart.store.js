// Cart/store/Cart.store.js

import { create } from "zustand";

import {
  addToCart,
  getCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
} from "../api/Cart.api";

const useCartStore = create((set, get) => ({
  // Array of Products
  cart: [],
  isLoading: false,
  error: null,

  getUserCart: async (user_id) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const response = await getCart(user_id);
 
  
      set({
        cart: response.data || [],
        isLoading: false,
        error: null,
      });
      return response
    } catch (error) {
      console.log(`error at Cart.store getUserCart: ${error}`);

      set({
        cart: [],
        isLoading: false,
        error: error.message || "Failed to fetch cart",
      });
    }
  },

  addProductToCart: async (data) => {
  set({
    isLoading: true,
    error: null,
  });

  try {
    const response = await addToCart(data);

    console.log("2. Cart Store: Product added successfully", response);

    // Get getUserCart from the same Zustand store
    await get().getUserCart(data.user_id);

    set({
      isLoading: false,
      error: null,
    });

    return true;
  } catch (error) {
    console.log(`error at Cart.store addProductToCart: ${error}`);

    set({
      isLoading: false,
      error: error.message || "Failed to add product to cart",
    });

    return false;
  }
},

  updateProductQuantity: async (data) => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response = await updateCartItem(data);
      set({
        isLoading: false,
        error: null,
      });

      return true;
    } catch (error) {
      console.log(`error at Cart.store updateProductQuantity: ${error}`);
      set({
        isLoading: false,
        error: error.message || "Failed to update quantity",
      });

      return false;
    }
  },

  removeCartItem: async (data) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const response = await deleteCartItem(data);

      set({
        isLoading: false,
        error: null,
      });

      return true;
    } catch (error) {
      console.log(`error at Cart.store removeCartItem: ${error}`);

      set({
        isLoading: false,
        error: error.message || "Failed to delete cart item",
      });

      return false;
    }
  },

  clearUserCart: async (user_id) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      console.log("3. Cart Store: Clearing cart...");

      const response = await clearCart(user_id);

      console.log("4. Cart Store: Cart cleared", response);

      set({
        cart: [],
        isLoading: false,
        error: null,
      });

      return true;
    } catch (error) {
      console.log(`error at Cart.store clearUserCart: ${error}`);

      set({
        isLoading: false,
        error: error.message || "Failed to clear cart",
      });

      return false;
    }
  },

  // ==============================
  // CLEAR ERROR
  // ==============================

  clearCartError: () => {
    set({
      error: null,
    });
  },
}));

export default useCartStore;
