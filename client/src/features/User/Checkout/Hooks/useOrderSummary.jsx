import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useProfile } from "./../../../Profile/Hooks/useProfile";
import { useOrderStore } from "./../../Order/Store/Orders.store";
import { useCheckoutStore } from "../Store/Checkout.store";
export default function useOrderSummary() {
  const navigate = useNavigate();
  const {
    paymentMethod,
    setPayment,
    setselectedCard,
    selectedCard,
    setShipping,
    shippingMethod,
  } = useCheckoutStore();
  const [coupon, setCoupon] = useState("");

  const { userCards, Get_UserCards } = useProfile();
  const { CreateOrder, CreateOrderHistory, order } = useOrderStore();
  const Calc_total = (cartProducts) => {
    const subtotal = cartProducts?.reduce(
      (total, product) => total + Number(product.sub_total),
      0,
    );
    const shipping = shippingMethod === "express" ? 15 : 0;
    const total = subtotal + shipping;

    return {
      shipping,
      subtotal,
      total,
    };
  };

  return {
    navigate,
    paymentMethod,
    setPayment,
    setselectedCard,
    selectedCard,
    setShipping,
    shippingMethod,
    coupon,
    setCoupon,
    userCards,
    Get_UserCards,
    CreateOrder,
    Calc_total,
    CreateOrderHistory,
    order,
  };
}
