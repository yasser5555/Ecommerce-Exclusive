import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import Introduction from "../Components/Introduction";
import { useOrderStore } from "../../Order/Store/Orders.store";
import { useProfileStore } from "../../Profile/Store/profile.store";
import Orderedproducts from "../Components/Orderedproducts";
import DeliveryAddress from "../Components/DeliveryAddress";
import { useCheckoutStore } from "../../Checkout/Store/Checkout.store";
import { useParams } from "react-router-dom";

export default function OrderConfirmationPage() {
  const { orderHistory, FetchOrder, isloading } = useOrderStore();
  const { id } = useParams();

  const { profile, fetchProfile } = useProfileStore();

  const {
    selectedAddress,
    selectedCard,
    paymentMethod,
    shippingMethod,
  } = useCheckoutStore();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (!profile?.id) return;

    FetchOrder();
  }, [profile?.id, FetchOrder]);

  useEffect(() => {
    if (!id) return;

    const duration = 2500;
    const end = Date.now() + duration;

    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 40,
        startVelocity: 25,
        spread: 460,
        ticks: 240,
        origin: {
          x: Math.random(),
          y: Math.random() * 0.5,
        },
      });
    }, 150);

    return () => clearInterval(interval);
  }, [id]);

  const orders = orderHistory?.data ?? [];

  const order = orders.find(
    (item) => String(item.order_id) === String(id)
  );

  return (
    <div className="container">
      <Introduction
        order={order}
        isLoading={isloading}
      />

      <div className="row g-4">
        <Orderedproducts
          order={order}
          paymentMethod={paymentMethod}
          shippingMethod={shippingMethod}
        />

        <DeliveryAddress
          profile={profile}
          selectedAddress={selectedAddress}
          paymentMethod={paymentMethod}
          selectedCard={selectedCard}
        />
      </div>
    </div>
  );
}