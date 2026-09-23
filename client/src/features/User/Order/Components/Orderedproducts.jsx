import { Check, Package } from "lucide-react";
import React from "react";

export default function Orderedproducts({
  order,
  paymentMethod = "Cash on Delivery",
  shippingMethod = "Standard Delivery",
}) {
  if (!order) {
    return (
      <div className="col-lg-8">
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

            <h6 className="fw-semibold">
              Loading order details...
            </h6>
          </div>
        </div>
      </div>
    );
  }

  const products = order?.products ?? [];

  const totalItems = products.reduce(
    (total, product) =>
      total + Number(product.quantity || 0),
    0
  );

  const totalSum = Number(order?.total_sum || 0);

  const orderDate = order?.created_at
    ? new Date(order.created_at).toLocaleDateString()
    : "-";

  const arriveDate = order?.arrive_at
    ? new Date(order.arrive_at).toLocaleDateString()
    : "-";

  return (
    <div className="col-lg-8">
      {/* =====================
            ORDERED PRODUCTS
        ====================== */}

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="fw-bold mb-0 d-flex align-items-center gap-2">
              <Package size={16} className="text-danger" />

              Ordered Products ({products.length})
            </h6>

            <span className="badge bg-light text-secondary">
              {shippingMethod}
            </span>
          </div>

          {/* =====================
                PRODUCTS
            ====================== */}

          {products.map((product, index) => (
            <div
              className="border-top py-3"
              key={`${product.product_id}-${index}`}
            >
              <div className="row align-items-center">

                <div className="col-2 col-md-1">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="img-fluid rounded bg-light"
                  />
                </div>

                <div className="col-7 col-md-8">

                  <span className="badge bg-white text-dark small">
                    Product
                  </span>

                  <h6 className="mb-1 mt-1">
                    {product.name}
                  </h6>

                  <span className="badge bg-light text-dark">
                    Quantity: {product.quantity}
                  </span>

                </div>

                <div className="col-3 text-end">
                  <strong className="text-danger d-block">
                    ${Number(product.price).toFixed(2)}
                  </strong>
                </div>

              </div>
            </div>
          ))}

          {/* =====================
                SUMMARY
            ====================== */}

          <div className="bg-light rounded p-3 mt-2">

            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted small">
                Items Subtotal
              </span>

              <strong className="small">
                ${totalSum.toFixed(2)}
              </strong>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted small">
                {shippingMethod}
              </span>

              <strong className="text-success small">
                FREE
              </strong>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted small">
                Applied Discount
              </span>

              <strong className="small">
                $0.00
              </strong>
            </div>

            <div className="d-flex justify-content-between">
              <span className="text-muted small">
                Estimated Tax (Inclusive)
              </span>

              <strong className="small">
                $0.00
              </strong>
            </div>

          </div>

          {/* =====================
                TOTAL
            ====================== */}

          <div className="bg-light border-top mt-2 pt-3 px-2 d-flex justify-content-between align-items-center">

            <div>
              <h6 className="fw-bold mb-0">
                Total Amount
              </h6>

              <small className="text-muted">
                Payable via {paymentMethod}
              </small>
            </div>

            <h3 className="fw-bold text-danger mb-0">
              ${totalSum.toFixed(2)}
            </h3>

          </div>

        </div>
      </div>

      {/* =====================
            FULFILLMENT STATUS
        ====================== */}

      <div className="card border-0 shadow-sm">
        <div className="card-body">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <h6 className="fw-bold mb-0">
              Live Fulfillment Status
            </h6>

            <span className="badge bg-danger-subtle text-danger">
              Step 1 of 4: Confirmed
            </span>

          </div>

          <div className="row d-lg-flex text-start d-block text-lg-center">

            {/* STEP 1 */}

            <div className="col col-lg-3 d-flex flex-lg-column flex-row align-items-lg-stretch align-items-baseline gap-lg-0 gap-2">

              <div
                className="bg-danger text-white rounded-circle mx-lg-auto mx-1 mb-2 d-flex align-items-center justify-content-center"
                style={{
                  width: "30px",
                  height: "30px",
                }}
              >
                <Check size={14} />
              </div>

              <strong className="d-lg-block d-flex small">
                Order Placed
              </strong>

              <small className="text-muted">
                {orderDate}
              </small>

            </div>

            {/* STEP 2 */}

            <div className="col col-lg-3 d-flex flex-lg-column flex-row align-items-lg-stretch align-items-baseline gap-lg-0 gap-2">

              <div
                className="bg-light text-muted rounded-circle mx-lg-auto mx-1 mb-2 d-flex align-items-center justify-content-center"
                style={{
                  width: "30px",
                  height: "30px",
                }}
              >
                2
              </div>

              <strong className="small">
                Processing
              </strong>

              <small className="text-muted">
                In Warehouse
              </small>

            </div>

            {/* STEP 3 */}

            <div className="col col-lg-3 d-flex flex-lg-column flex-row align-items-lg-stretch align-items-baseline gap-lg-0 gap-2">

              <div
                className="bg-light text-muted rounded-circle mx-lg-auto mx-1 mb-2 d-flex align-items-center justify-content-center"
                style={{
                  width: "30px",
                  height: "30px",
                }}
              >
                3
              </div>

              <strong className="small">
                Shipped
              </strong>

              <small className="text-muted">
                Tracking Ready
              </small>

            </div>

            {/* STEP 4 */}

            <div className="col col-lg-3 d-flex flex-lg-column flex-row align-items-lg-stretch align-items-baseline gap-lg-0 gap-2">

              <div
                className="bg-light text-muted rounded-circle mx-lg-auto mx-1 mb-2 d-flex align-items-center justify-content-center"
                style={{
                  width: "30px",
                  height: "30px",
                }}
              >
                4
              </div>

              <strong className="small">
                Delivered
              </strong>

              <small className="text-muted">
                By {arriveDate}
              </small>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}