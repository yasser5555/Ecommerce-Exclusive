import { useEffect } from "react";
import { FetchOnRender } from "./../Utils/useFetchProfile";
import { useOrderhistory } from "../Hooks/useOrderhistory";
import { useProfileStore } from "./../Store/profile.store";

function OrderHistory() {
  const { userOrders, isLoadng, error, fetchUserOrders } = useProfileStore();
  const { loadOrders, getStatusBadge, formatPrice } = useOrderhistory();
  FetchOnRender(() => loadOrders(fetchUserOrders));
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Order History</h4>
          <p className="text-muted mb-0">
            View your previous orders and their status
          </p>
        </div>

        {!isLoadng && userOrders?.length > 0 && (
          <span className="badge bg-light text-dark border px-3 py-2">
            {userOrders.length} {userOrders.length === 1 ? "Order" : "Orders"}
          </span>
        )}
      </div>

      {/* =========================
          Error
      ========================= */}
      {error && (
        <div className="alert alert-danger border-0 shadow-sm">
          <i className="fas fa-exclamation-circle me-2"></i>
          {error}
        </div>
      )}

      {/* =========================
          Loading
      ========================= */}
      {isLoadng ? (
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5">
            <div className="spinner-border text-danger mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>

            <p className="text-muted mb-0">Loading your orders...</p>
          </div>
        </div>
      ) : !userOrders || userOrders.length === 0 ? (
        /* =========================
           Empty State
        ========================= */
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5">
            <div
              className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
              style={{
                width: "70px",
                height: "70px",
              }}
            >
              <i className="fas fa-shopping-bag fa-2x text-muted"></i>
            </div>

            <h5 className="fw-bold mb-2">No Orders Yet</h5>

            <p className="text-muted mb-0">You haven't made any orders yet.</p>
          </div>
        </div>
      ) : (
        /* =========================
           Orders Table
        ========================= */
        <div className="card border-0 shadow-sm overflow-hidden">
          {/* Card Header */}
          <div className="card-header bg-white border-0 px-4 py-3">
            <div className="d-flex align-items-center">
              <div
                className="bg-danger bg-opacity-10 text-danger rounded-3 d-flex align-items-center justify-content-center me-3"
                style={{
                  width: "44px",
                  height: "44px",
                }}
              >
                <i className="fas fa-receipt"></i>
              </div>

              <div>
                <h6 className="fw-bold mb-0">Your Orders</h6>

                <small className="text-muted">Recent order activity</small>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr className="bg-light">
                  <th className="border-0 px-4 py-3 text-muted small text-uppercase">
                    Order
                  </th>

                  <th className="border-0 py-3 text-muted small text-uppercase">
                    Quantity
                  </th>

                  <th className="border-0 py-3 text-muted small text-uppercase">
                    Total
                  </th>

                  <th className="border-0 py-3 text-muted small text-uppercase">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {userOrders.map((order) => (
                  <tr key={order.id}>
                    {/* Order */}
                    <td className="px-4">
                      <div className="d-flex align-items-center">
                        <div
                          className="bg-danger bg-opacity-10 text-danger rounded-3 d-flex align-items-center justify-content-center me-3"
                          style={{
                            width: "45px",
                            height: "45px",
                          }}
                        >
                          <i className="fas fa-box"></i>
                        </div>

                        <div>
                          <div className="fw-semibold">{order.title}</div>

                          <small className="text-muted">
                            Order #{order.id}
                          </small>
                        </div>
                      </div>
                    </td>

                    {/* Quantity */}
                    <td>
                      <span className="badge bg-light text-dark border px-3 py-2">
                        {order.quantity}{" "}
                        {order.quantity === 1 ? "Item" : "Items"}
                      </span>
                    </td>

                    {/* Total */}
                    <td>
                      <span className="fw-bold">
                        {formatPrice(order.total_price)}
                      </span>
                    </td>

                    {/* Status */}
                    <td>{getStatusBadge(order.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="card-footer bg-white border-top px-4 py-3">
            <div className="d-flex justify-content-between align-items-center">
              <small className="text-muted">
                Showing {userOrders.length}{" "}
                {userOrders.length === 1 ? "order" : "orders"}
              </small>

              <small className="text-muted">
                <i className="fas fa-shield-alt me-1"></i>
                Secure order history
              </small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
