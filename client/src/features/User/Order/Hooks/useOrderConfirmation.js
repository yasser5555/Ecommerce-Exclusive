import React, { useState } from "react";
import { useCheckoutStore } from "../../Checkout/Store/Checkout.store";
import { useProfileStore } from "../../../Profile/Store/profile.store";
import { useOrderStore } from "../Store/Orders.store";
import NotAuthorized from "../Components/notAuthorized";
import Introduction from "../Components/Introduction";

export default function useOrderConfirmation() {
  const { orderHistory, FetchOrder, isloading } = useOrderStore();

  const [ordersLoaded, setOrdersLoaded] = useState(false);
  const { selectedAddress, selectedCard, paymentMethod, shippingMethod } =
    useCheckoutStore();
  const { profile, fetchProfile } = useProfileStore();
  const [profileLoaded, setProfileLoaded] = useState(Boolean(profile?.id));

  const loadProfile = () => {
    if (profile?.id) {
      setProfileLoaded(true);
      return;
    }

    fetchProfile().catch((error) => {
      console.error(`Error fetching profile: ${error.message}`);
    });
  };

  const LoadOrder = () => {
    if (!profileLoaded || !profile?.id) return;
    let active = true;
    setOrdersLoaded(false);
    FetchOrder()
      .catch((error) => {
        console.error(`Error fetching orders: ${error.message}`);
      })
      .finally(() => {
        if (active) {
          setOrdersLoaded(true);
        }
      });

    return () => {
      active = false;
    };
  };
  const check_user_authentication = (order, profile) => {
    if (!profileLoaded || !ordersLoaded || isloading) {
      return <Introduction order={null} isLoading />;
    }

    if (!profile?.id) {
      return <NotAuthorized />;
    }

    if (!order) {
      return <NotAuthorized />;
    }

    if (Number(order.user_id) !== Number(profile.id)) {
      return <NotAuthorized />;
    }
  };
  const checkOrderOwnership = (order, profile) => {
    if (Number(order.user_id) !== Number(profile.id)) {
      return <NotAuthorized />;
    }
  };
  return {
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
  };
}
