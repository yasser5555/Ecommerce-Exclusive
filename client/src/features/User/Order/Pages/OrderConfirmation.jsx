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

export default function OrderConfirmationPage() {
  const { orderHistory, FetchOrder, isloading } = useOrderStore();
  const { orderid: orderID } = useParams();
  const { profile, fetchProfile } = useProfileStore();
  const [profileLoaded, setProfileLoaded] = useState(Boolean(profile?.id));
  const [ordersLoaded, setOrdersLoaded] = useState(false);
  const { selectedAddress, selectedCard, paymentMethod, shippingMethod } =
    useCheckoutStore();

  useEffect(() => {
    if (profile?.id) {
      setProfileLoaded(true);
      return;
    }

    let active = true;
    fetchProfile()
      .catch((error) => {
        console.error(`Error fetching profile: ${error.message}`);
      })
      .finally(() => {
        if (active) {
          setProfileLoaded(true);
        }
      });

    return () => {
      active = false;
    };
  }, [profile?.id, fetchProfile]);

  useEffect(() => {
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
  }, [orderID, profileLoaded, profile?.id, FetchOrder]);

  useEffect(() => {
    if (!orderID) return;

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
  }, [orderID]);

  const order = orderHistory?.find(
    (item) => Number(item.order_id) === Number(orderID),
  );

 

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
  return (
    <div className="container">
      <Introduction order={order}  />

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
