import React from "react";
import useCartStore from "../store/Cart.store";

export default function useCart() {
  return useCartStore();
}
