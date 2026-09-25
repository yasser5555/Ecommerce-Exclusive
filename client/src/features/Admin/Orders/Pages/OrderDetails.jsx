import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOrdersStore } from "../Store/Order.store";
import OrderDetailsCard from "../Components/OrderDetailsCard";

export default function OrderDetails() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { selectedOrder, orderDetailLoading, orderDetailError, fetchOrderDetails } =
    useOrdersStore();

  useEffect(() => {
    if (!orderId) return;

    const getOrderDetails = async () => {
      try {
        await fetchOrderDetails(orderId);
      } catch (error) {
        console.error("error at OrderDetails page:", error);
      }
    };

    getOrderDetails();
  }, [fetchOrderDetails, orderId]);
   return (
    <OrderDetailsCard
      order={selectedOrder}
      loading={orderDetailLoading}
      error={orderDetailError}
      onBack={() => navigate("/admin/orders")}
    />
  );
}
