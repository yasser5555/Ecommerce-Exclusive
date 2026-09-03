// import { useProfileStore } from "../Store/profile.store";
import { useProfileStore } from "./../Store/profile.store";

export const useOrderhistory = () => {
  const loadOrders = async (fetchFunction) => {
    try {
      await fetchFunction();
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const getStatusBadge = (status) => {
    const normalizedStatus = status?.toLowerCase();

    switch (normalizedStatus) {
      case "delivered":
        return (
          <span className="badge rounded-pill bg-success-subtle text-success px-3 py-2">
            <i className="fas fa-check-circle me-1"></i>
            Delivered
          </span>
        );

      case "pending":
        return (
          <span className="badge rounded-pill bg-warning-subtle text-warning px-3 py-2">
            <i className="fas fa-clock me-1"></i>
            Pending
          </span>
        );

      case "cancelled":
        return (
          <span className="badge rounded-pill bg-danger-subtle text-danger px-3 py-2">
            <i className="fas fa-times-circle me-1"></i>
            Cancelled
          </span>
        );

      case "processing":
        return (
          <span className="badge rounded-pill bg-info text-white px-3 py-2">
            <i className="fas fa-spinner me-1"></i>
            Processing
          </span>
        );

      default:
        return (
          <span className="badge rounded-pill bg-secondary-subtle text-secondary px-3 py-2">
            {status || "Unknown"}
          </span>
        );
    }
  };
  const formatPrice = (price) => {
    return `$${Number(price).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return {
    loadOrders,
    getStatusBadge,
    formatPrice,
  };
};
