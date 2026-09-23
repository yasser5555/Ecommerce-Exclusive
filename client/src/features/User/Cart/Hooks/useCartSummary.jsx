import React from "react";
import useCartStore from "../store/Cart.store";

export default function useCartSummary() {
  const { cart } = useCartStore();

  const total = cart.reduce(
    (sum, item) => sum + Number(item.sub_total || 0),
    0,
  );
  return { cart , total };
  // const { cart , total } = useCartSummary()
}
