import { Check } from "lucide-react";
import React from "react";

export default function Introduction({
  order,
  isLoading,
}) {
  if (isLoading || !order) {
    return (
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body text-center py-5">
          <div
            className="spinner-border text-danger mb-3"
            role="status"
          >
            <span className="visually-hidden">
              Loading...
            </span>
          </div>

          <h5 className="fw-semibold">
            Loading your order...
          </h5>

          <p className="text-muted mb-0">
            Please wait while we load your order details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body text-center py-4">
        <div
          className="bg-danger text-white rounded-2 d-flex align-items-center justify-content-center mx-auto mb-3"
          style={{ width: "45px", height: "45px" }}
        >
          <Check size={22} />
        </div>

        <h3 className="fw-bold mb-2">
          Order Placed Successfully!
        </h3>

        <p
          className="text-muted small mx-auto mb-4"
          style={{ maxWidth: "500px" }}
        >
          Thank you for your order. Your order has been
          successfully placed and is now being processed by
          our fulfillment team.
        </p>

        <div className="row bg-light rounded-2 p-3 text-start">
          <div className="col-md-3 mb-2 mb-md-0">
            <small className="text-muted d-block">
              ORDER ID
            </small>

            <strong>#{order.order_id}</strong>
          </div>

          <div className="col-md-3 mb-2 mb-md-0">
            <small className="text-muted d-block">
              ORDER DATE
            </small>

            <strong>
              {new Date(
                order.created_at
              ).toLocaleDateString()}
            </strong>
          </div>

          <div className="col-md-3 mb-2 mb-md-0">
            <small className="text-muted d-block">
              ESTIMATED DELIVERY
            </small>

            <strong className="text-danger">
              {new Date(
                order.arrive_at
              ).toLocaleDateString()}
            </strong>
          </div>

          <div className="col-md-3">
            <small className="text-muted d-block">
              TOTAL
            </small>

            <strong>
              ${Number(order.total_sum).toFixed(2)}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}