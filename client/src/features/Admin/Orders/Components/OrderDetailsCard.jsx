import React from "react";
import {
  ArrowLeft,
  Package,
  User,
  Mail,
  Calendar,
  Truck,
  MapPin,
  CreditCard,
  Clock,
  Phone,
} from "lucide-react";

const formatDate = (date) => {
  if (!date) return "N/A";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatPrice = (value) => {
  const price = Number(value ?? 0);

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

const formatStatus = (status) => {
  if (!status) return "Unknown";

  return (
    status.charAt(0).toUpperCase() +
    status.slice(1).toLowerCase()
  );
};

const getStatusClass = (status) => {
  const normalizedStatus = `${status || ""}`.toLowerCase();

  if (normalizedStatus === "delivered") {
    return "bg-success-subtle text-success";
  }

  if (normalizedStatus === "processing") {
    return "bg-primary-subtle text-primary";
  }

  if (normalizedStatus === "shipped") {
    return "bg-info-subtle text-info";
  }

  if (normalizedStatus === "pending") {
    return "bg-warning-subtle text-warning";
  }

  if (normalizedStatus === "cancelled") {
    return "bg-danger-subtle text-danger";
  }

  return "bg-secondary-subtle text-secondary";
};

export default function OrderDetailsCard({
  order,
  loading,
  error,
  onBack,
}) {
  if (loading) {
    return (
      <div className="container-fluid bg-light min-vh-100 p-4">
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center">
          <div
            className="spinner-border text-danger mb-3"
            role="status"
          >
            <span className="visually-hidden">
              Loading...
            </span>
          </div>

          <div className="fw-semibold">
            Loading order details...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid bg-light min-vh-100 p-4">
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center">
          <h5 className="fw-bold text-danger">
            Could not load order details
          </h5>

          <p className="text-muted mb-0">
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container-fluid bg-light min-vh-100 p-4">
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center">
          <h5 className="fw-bold">
            No order found
          </h5>

          <p className="text-muted mb-0">
            Try selecting another order from the list.
          </p>
        </div>
      </div>
    );
  }

  console.log("Order Details:", order);

  const orderId = order.order_id || "Unknown";

  const customerName =
    `${order.first_name || ""} ${
      order.last_name || ""
    }`.trim() || "Customer";

  const products = Array.isArray(order.products)
    ? order.products
    : [];

  const total = Number(order.total_sum ?? 0);

  return (
    <div className="container-fluid bg-light min-vh-100 p-4">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <button
            type="button"
            className="btn btn-outline-danger border rounded-3 mb-3"
            onClick={onBack}
          >
            <ArrowLeft
              size={17}
              className="me-2"
            />

            Back to Orders
          </button>

          <h3 className="fw-bold mb-1">
            Order #{orderId}
          </h3>

          <p className="text-muted mb-0">
            Order placed on{" "}
            {formatDate(order.created_at)}
          </p>
        </div>

        <span
          className={`badge rounded-pill px-4 py-2 fs-6 ${getStatusClass(
            order.status
          )}`}
        >
          <Clock
            size={16}
            className="me-1"
          />

          {formatStatus(order.status)}
        </span>
      </div>

      <div className="row g-4">
        {/* LEFT COLUMN */}
        <div className="col-xl-8">
          {/* Order Items */}
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
            <div className="card-header bg-white border-0 p-4">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="bg-danger-subtle text-danger rounded-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "45px",
                    height: "45px",
                  }}
                >
                  <Package size={21} />
                </div>

                <div>
                  <h5 className="fw-bold mb-1">
                    Order Items
                  </h5>

                  <small className="text-muted">
                    {products.length}{" "}
                    {products.length === 1
                      ? "product"
                      : "products"}{" "}
                    included in this order
                  </small>
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="ps-4 py-3">
                      Product
                    </th>

                    <th className="py-3">
                      Price
                    </th>

                    <th className="py-3">
                      Quantity
                    </th>

                    <th className="text-end pe-4 py-3">
                      Total
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {products.length > 0 ? (
                    products.map(
                      (product, index) => {
                        const productPrice =
                          Number(
                            product.price ?? 0
                          );

                        const quantity =
                          Number(
                            product.quantity ?? 0
                          );

                        const productTotal =
                          productPrice *
                          quantity;

                        return (
                          <tr
                            key={`${orderId}-${product.product_id || index}`}
                          >
                            {/* Product */}
                            <td className="ps-4 py-4">
                              <div className="d-flex align-items-center gap-3">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="rounded-3 bg-light"
                                  style={{
                                    width: "65px",
                                    height: "65px",
                                    objectFit:
                                      "contain",
                                  }}
                                />

                                <div>
                                  <h6 className="fw-semibold mb-1">
                                    {product.name ||
                                      "Unknown Product"}
                                  </h6>

                                  <small className="text-muted">
                                    Product ID: #
                                    {product.product_id ||
                                      "N/A"}
                                  </small>
                                </div>
                              </div>
                            </td>

                            {/* Price */}
                            <td>
                              <div>
                                <span className="fw-semibold">
                                  {formatPrice(
                                    productPrice
                                  )}
                                </span>

                                {Number(
                                  product.old_price
                                ) >
                                  productPrice && (
                                  <small className="text-muted text-decoration-line-through d-block">
                                    {formatPrice(
                                      product.old_price
                                    )}
                                  </small>
                                )}
                              </div>
                            </td>

                            {/* Quantity */}
                            <td>
                              <span className="badge bg-light text-dark border rounded-pill px-3 py-2">
                                × {quantity}
                              </span>
                            </td>

                            {/* Total */}
                            <td className="text-end pe-4">
                              <span className="fw-bold">
                                {formatPrice(
                                  productTotal
                                )}
                              </span>
                            </td>
                          </tr>
                        );
                      }
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-5 text-muted"
                      >
                        No products found in this
                        order.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Status */}
          <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div
                  className="bg-danger-subtle text-danger rounded-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "45px",
                    height: "45px",
                  }}
                >
                  <Truck size={21} />
                </div>

                <div>
                  <h5 className="fw-bold mb-1">
                    Order Status
                  </h5>

                  <small className="text-muted">
                    Current order progress
                  </small>
                </div>
              </div>

              <div className="row g-3">
                {/* Status */}
                <div className="col-md-4">
                  <div className="bg-light rounded-4 p-3 h-100">
                    <small className="text-muted d-block mb-2">
                      Order Status
                    </small>

                    <span
                      className={`badge rounded-pill px-3 py-2 ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {formatStatus(
                        order.status
                      )}
                    </span>
                  </div>
                </div>

                {/* Created */}
                <div className="col-md-4">
                  <div className="bg-light rounded-4 p-3 h-100">
                    <small className="text-muted d-block mb-2">
                      Created At
                    </small>

                    <div className="fw-semibold">
                      {formatDate(
                        order.created_at
                      )}
                    </div>
                  </div>
                </div>

                {/* Arrival */}
                <div className="col-md-4">
                  <div className="bg-light rounded-4 p-3 h-100">
                    <small className="text-muted d-block mb-2">
                      Expected Arrival
                    </small>

                    <div className="fw-semibold">
                      {formatDate(
                        order.arrive_at
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div
                  className="bg-danger-subtle text-danger rounded-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "45px",
                    height: "45px",
                  }}
                >
                  <MapPin size={21} />
                </div>

                <div>
                  <h5 className="fw-bold mb-1">
                    Shipping Address
                  </h5>

                  <small className="text-muted">
                    Customer delivery address
                  </small>
                </div>
              </div>

              <div className="bg-light rounded-4 p-4">
                <h6 className="fw-bold mb-2">
                  {customerName}
                </h6>

                <p className="text-muted mb-1">
                  {order.street_number ||
                    "Street address unavailable"}
                </p>

                <p className="text-muted mb-1">
                  {[
                    order.city,
                    order.country,
                  ]
                    .filter(Boolean)
                    .join(", ") ||
                    "Location unavailable"}
                </p>

                <p className="text-muted mb-0">
                  <Phone
                    size={15}
                    className="me-2"
                  />

                  {order.phone_number ||
                    "No phone provided"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-xl-4">
          {/* Customer */}
          <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-body p-4">
              

              {/* User Avatar */}
              <div className="d-flex align-items-center gap-3 mb-4">
                <div
                  className="bg-danger-subtle text-danger rounded-circle d-flex align-items-center justify-content-center fw-bold overflow-hidden"
                  style={{
                    width: "60px",
                    height: "60px",
                  }}
                >
                  {order.user_image ? (
                    <img
                      src={order.user_image}
                      alt={customerName}
                      className="w-100 h-100 object-fit-cover"
                    />
                  ) : (
                    <User size={28} />
                  )}
                </div>

                <div>
                  <h6 className="fw-bold mb-1">
                    {customerName}
                  </h6>

                  <small className="text-muted">
                    Customer #{order.user_id || "N/A"}
                  </small>
                </div>
              </div>

              <div className="border-top pt-3">
                {/* Email */}
                <div className="d-flex align-items-center gap-2 mb-3">
                  <Mail
                    size={17}
                    className="text-muted"
                  />

                  <span className="text-muted text-break">
                    {order.email ||
                      "No email provided"}
                  </span>
                </div>

                {/* Phone */}
                <div className="d-flex align-items-center gap-2 mb-3">
                  <Phone
                    size={17}
                    className="text-muted"
                  />

                  <span className="text-muted">
                    {order.phone_number ||
                      "No phone provided"}
                  </span>
                </div>

                {/* Customer Since */}
                <div className="d-flex align-items-center gap-2">
                  <Calendar
                    size={17}
                    className="text-muted"
                  />

                  <span className="text-muted">
                    Customer since{" "}
                    {formatDate(
                      order.created_at
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div
                  className="bg-danger-subtle text-danger rounded-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "45px",
                    height: "45px",
                  }}
                >
                  <CreditCard size={21} />
                </div>

                <div>
                  <h5 className="fw-bold mb-1">
                    Order Summary
                  </h5>

                  <small className="text-muted">
                    Payment information
                  </small>
                </div>
              </div>

              {/* Products Count */}
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">
                  Products
                </span>

                <span className="fw-semibold">
                  {products.length}
                </span>
              </div>

              {/* Total */}
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">
                  Order Total
                </span>

                <span className="fw-semibold">
                  {formatPrice(total)}
                </span>
              </div>

              <hr />

              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold">
                  Total
                </span>

                <span className="fw-bold fs-4 text-danger">
                  {formatPrice(total)}
                </span>
              </div>

              <div className="mt-3">
                <span
                  className={`badge rounded-pill px-3 py-2 ${getStatusClass(
                    order.status
                  )}`}
                >
                  <Clock
                    size={14}
                    className="me-1"
                  />

                  {formatStatus(order.status)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}