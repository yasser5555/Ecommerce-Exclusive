import { useState } from "react";
import { CreditCard, Lock, MapPin, Truck, WalletCards } from "lucide-react";
import BillingDetails from "../Components/Billing Details";
import { useChangeTitle } from "../../../shared/Utils/useChangeTitle";
import OrderSummary from "../Components/Order_Summary";
import useCart from "./../../Cart/Hooks/useCart";
export default function CheckoutPage() {
  useChangeTitle({ title: "Placing Order" });
  const { cart } = useCart();
  
  
  return (
    <div className="bg-white">
      <div className="container py-5">
        <div className="row g-1 g-md-5 px-3 mb-2">
          <BillingDetails />
          <OrderSummary cartProducts={cart} />
        </div>
      </div>
    </div>
  );
}
