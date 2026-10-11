import React, { useCallback, useState } from "react";
import { useOrderStore } from "../Store/Orders.store";

export default function useOrderDetials() {
  const [accessDenied, setAccessDenied] = useState(false);
  const { order, orderId, isloading, FetchOrderDetails } = useOrderStore();
 const getOrderDetails = useCallback(async (order_id) => {
      try {
        await FetchOrderDetails(order_id);
      } catch (error) {
        if (error.response?.status === 403) {
          setAccessDenied(true);
        }
        console.error(`Error at GetOrderDetails: ${error.message}`);
      }
    }, [FetchOrderDetails]);
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
   const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return <span className="badge text-bg-warning px-3 py-2">Pending</span>;

      case "shipped":
        return <span className="badge text-bg-primary px-3 py-2">Shipped</span>;

      case "delivered":
        return (
          <span className="badge text-bg-success px-3 py-2">Delivered</span>
        );

      case "cancelled":
        return (
          <span className="badge text-bg-danger px-3 py-2">Cancelled</span>
        );

      default:
        return (
          <span className="badge text-bg-secondary px-3 py-2">{status}</span>
        );
    }
  };
  return {
    order,
    orderId,
    isloading,
    FetchOrderDetails,
    accessDenied,
    setAccessDenied,
    getOrderDetails,
    formatDate,
    getStatusBadge
  };
}
