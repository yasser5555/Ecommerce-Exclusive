import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import Introduction from "../Components/Introduction";
import { useOrderStore } from "../../Order/Store/Orders.store";
import { useProfileStore } from "../../../Profile/Store/profile.store";
import Orderedproducts from "../Components/Orderedproducts";
import DeliveryAddress from "../Components/DeliveryAddress";
import { useCheckoutStore } from "../../Checkout/Store/Checkout.store";
import { useParams } from "react-router-dom";
import NotAuthorized from "../Components/notAuthorized";
import useOrderConfirmation from "../Hooks/useOrderConfirmation";
import { useChangeTitle } from "../../../../shared/Utils/useChangeTitle";

export default function OrderConfirmationPage() {
  const { orderid: orderID } = useParams();
  useChangeTitle({ title: `Order-${orderID}` });
  const {
    ordersLoaded,
    selectedAddress,
    selectedCard,
    paymentMethod,
    shippingMethod,
    profile,
    fetchProfile,
    profileLoaded,
    setProfileLoaded,
    setOrdersLoaded,
    orderHistory,
    FetchOrder,
    isloading,
    loadProfile,
    LoadOrder,
    check_user_authentication,
    checkOrderOwnership,
  } = useOrderConfirmation();

  useEffect(() => {
    loadProfile();
  }, [profile?.id, fetchProfile]);

  useEffect(() => {
    LoadOrder();
  }, [orderID, profileLoaded, profile?.id, FetchOrder]);

   

  const order = orderHistory?.find(
    (item) => Number(item.order_id) === Number(orderID),
  );

  const authenticationCheck = check_user_authentication(order, profile);

  if (authenticationCheck) {
    return authenticationCheck;
  }

  checkOrderOwnership(order, profile);
  return (
    <div className="container">
      <Introduction order={order} />

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
