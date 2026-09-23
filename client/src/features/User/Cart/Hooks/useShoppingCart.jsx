import React from "react";
import useCartStore from "./../store/Cart.store";

export default function useShoppingCart() {
  const {
    cart,
    isLoading,
    removeCartItem,
    updateProductQuantity,
    getUserCart,
  } = useCartStore();

  return {};
}
