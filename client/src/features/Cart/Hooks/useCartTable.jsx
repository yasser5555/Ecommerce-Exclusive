import React, { useEffect } from "react";
import useCart from "./useCart";

export default function useCartTable() {
  const {
    cart,
    isLoading,
    removeCartItem,
    updateProductQuantity,
    getUserCart,
  } = useCart();
  const GetCart = async (userId) => {
    try {
      await getUserCart(userId);
    } catch (error) {
      console.error(`error at Fetching user_Cart ${error}`);
    }
  };
 
  const handleQuantity = async (item, action ,userId) => {
    const success = await updateProductQuantity({
      cart_id: item.cart_id,
      user_id: userId,
      quantity: 1, // Control how many is added or not Added
      action,
    });
    if (success) {
      await getUserCart(userId);
    }
  };

  const handleDelete = async (cartId , userId) => {
    const success = await removeCartItem({
      cart_id: cartId,
      user_id: userId,
    });

    if (success) {
     GetCart(userId);
    }
  };
  return {
    cart,
    isLoading,
    removeCartItem,
    updateProductQuantity,
    GetCart,
    handleQuantity,
    handleDelete
  };
}
