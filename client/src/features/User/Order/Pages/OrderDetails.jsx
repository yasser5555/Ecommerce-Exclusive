import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle, Package, Truck } from "lucide-react";

import { useOrderStore } from "../Store/Orders.store";

export default function OrderDetails() {
  const { order_id } = useParams();
  console.log(`current order_id is ${order_id}`);
    
  const { order, isloading, FetchOrderDetails } = useOrderStore();

  useEffect(() => {
    const getOrderDetails = async (order_id) => {
      try {
        // console.log(`1.Fethcing now from Store`);
        await FetchOrderDetails(order_id);
        // console.log(`2.Data fetched from store Successfully ${order}`);
      } catch (error) {
        console.error(`Error at GetOrderDetails: ${error.message}`);
      }
    };

    getOrderDetails(order_id);
  }, [order_id, FetchOrderDetails]);
     console.log();

  if (isloading) {
    return (
      <div className="container py-5">
        <div className="d-flex justify-content-center align-items-center py-5">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!order || order.length === 0) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning text-center">Order not found.</div>
      </div>
    );
  }

  const currentOrder = order?.data?.["0"];
  const {
    user_id,
    status,
    created_at,
    arrive_at,
    total_sum,
    products = [],
  } = currentOrder;

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusBadge = () => {
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

  return (
    <div className="container-fluid bg-light min-vh-100 py-3 py-md-4">
      <div className="container">
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div>
            <button
              className="btn btn-outline-danger d-inline-flex align-items-center gap-2 mb-3"
              onClick={() => window.history.back()}
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <h2 className="fw-bold mb-1">Order #{order_id}</h2>

            <p className="text-muted mb-0">
              Placed on {formatDate(created_at)}
            </p>
          </div>

          <div>{getStatusBadge()}</div>
        </div>

        {/* Order Progress */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body p-3 p-md-4">
            <h5 className="fw-bold mb-4">Order Status</h5>

            <div className="row g-4 text-center">
              <div className="col-4">
                <div className="d-flex flex-column align-items-center">
                  <div className="rounded-circle bg-success text-white p-3 mb-2">
                    <CheckCircle size={22} />
                  </div>

                  <small className="fw-semibold">Order Placed</small>

                  <small className="text-muted">{formatDate(created_at)}</small>
                </div>
              </div>

              <div className="col-4">
                <div className="d-flex flex-column align-items-center">
                  <div
                    className={`rounded-circle text-white p-3 mb-2 ${
                      status === "pending" ? "bg-warning" : "bg-success"
                    }`}
                  >
                    <Package size={22} />
                  </div>

                  <small className="fw-semibold">Processing</small>

                  <small className="text-muted">
                    {status === "pending" ? "In progress" : "Completed"}
                  </small>
                </div>
              </div>

              <div className="col-4">
                <div className="d-flex flex-column align-items-center">
                  <div
                    className={`rounded-circle text-white p-3 mb-2 ${
                      status === "delivered" ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    <Truck size={22} />
                  </div>

                  <small className="fw-semibold">Delivery</small>

                  <small className="text-muted">{formatDate(arrive_at)}</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="row g-4">
          {/* Products */}
          <div className="col-12 col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-0 p-3 p-md-4">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="fw-bold mb-0">Order Items</h5>

                  <span className="text-muted small">
                    {products.length} {products.length === 1 ? "item" : "items"}
                  </span>
                </div>
              </div>

              <div className="card-body p-0">
                {products.map((product, index) => (
                  <div
                    key={product.product_id || index}
                    className="border-top p-3 p-md-4"
                  >
                    <div className="row align-items-center g-3">
                      {/* Image */}
                      <div className="col-4 col-sm-3 col-md-2">
                        <div
                          className="bg-light rounded d-flex align-items-center justify-content-center"
                          style={{ height: "110px" }}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="img-fluid"
                            style={{
                              maxHeight: "100px",
                              maxWidth: "100%",
                              objectFit: "contain",
                            }}
                          />
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="col-8 col-sm-9 col-md-6">
                        <h6 className="fw-semibold mb-2">{product.name}</h6>

                        <div className="d-flex flex-wrap gap-2">
                          <span className="badge text-bg-light border">
                            Quantity: {product.quantity}
                          </span>

                          <span className="badge text-bg-light border">
                            Product #{product.product_id}
                          </span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-12 col-md-4 text-md-end">
                        <div className="small text-muted mb-1">
                          {product.quantity} ×{" "}
                          {Number(product.price).toLocaleString()}
                        </div>

                        <div className="fw-bold fs-5">
                          {(
                            Number(product.price) * Number(product.quantity)
                          ).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-12 col-lg-4">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-0 p-3 p-md-4">
                <h5 className="fw-bold mb-0">Order Summary</h5>
              </div>

              <div className="card-body p-3 p-md-4">
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Subtotal</span>

                  <span className="fw-semibold">
                    {Number(total_sum).toLocaleString()}
                  </span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Shipping</span>

                  <span className="text-success fw-semibold">Free</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold">Total</span>

                  <span className="fw-bold fs-4 text-danger">
                    {Number(total_sum).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="card border-0 shadow-sm mt-4">
          <div className="card-body p-3 p-md-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
              <div>
                <h6 className="fw-bold mb-1">Need help with your order?</h6>

                <p className="text-muted mb-0 small">
                  Contact support if you have any issue with this order.
                </p>
              </div>

              <button className="btn btn-danger px-4">Contact Support</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
