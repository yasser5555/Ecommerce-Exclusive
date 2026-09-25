import React, { useEffect, useState } from "react";
import {
  Search,
  Eye,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useOrdersStore } from "../Store/Order.store";
import { useNavigate } from "react-router-dom";

export default function OrdersTable({
  search,
  setSearch,
  status,
  setStatus,
  orders,
}) {
  const [currentPage, setCurrentPage] = useState(1);
const navigate = useNavigate();
  const ordersPerPage = 10;

  const orderList = orders?.[4] || [];

  const filteredOrders = orderList.filter((order) => {
    const customerName =
      `${order.first_name || ""} ${order.last_name || ""}`.toLowerCase();
    const orderId = String(order.id).toLowerCase();
    const searchValue = search.toLowerCase();
    const matchesSearch =
      orderId.includes(searchValue) || customerName.includes(searchValue);
    const matchesStatus =
      status === "All" || order.status?.toLowerCase() === status.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const startIndex = (currentPage - 1) * ordersPerPage;

  const currentOrders = filteredOrders.slice(
    startIndex,
    startIndex + ordersPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, status]);

  const getStatusStyle = (orderStatus) => {
    const normalizedStatus = orderStatus?.toLowerCase();

    if (normalizedStatus === "delivered") {
      return "bg-success-subtle text-success";
    }

    if (normalizedStatus === "processing") {
      return "bg-primary-subtle text-primary";
    }

    if (normalizedStatus === "pending") {
      return "bg-warning-subtle text-warning";
    }

    if (normalizedStatus === "cancelled") {
      return "bg-danger-subtle text-danger";
    }

    return "bg-secondary-subtle text-secondary";
  };

  const formatStatus = (orderStatus) => {
    if (!orderStatus) return "Unknown";

    return (
      orderStatus.charAt(0).toUpperCase() + orderStatus.slice(1).toLowerCase()
    );
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatPrice = (price) => {
    return Number(price).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
      <div className="card-header bg-white border-0 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="fw-bold mb-1">Orders</h5>
            <small className="text-muted">
              Manage and track customer orders
            </small>
          </div>

          <div className="d-flex align-items-center gap-2">
            <span className="badge bg-danger-subtle text-danger rounded-pill px-3 py-2">
              <ShoppingCart size={14} className="me-1" />
              {filteredOrders.length} Orders
            </span>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-md-8">
            <div className="input-group">
              <span className="input-group-text bg-light border-0">
                <Search size={18} />
              </span>

              <input
                type="text"
                className="form-control bg-light border-0 shadow-none"
                placeholder="Search by order ID or customer..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-4">
            <select
              className="form-select border-light-subtle shadow-none"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="All">All Orders</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th className="ps-4 py-3">Order</th>
              <th className="py-3">Customer</th>
              <th className="py-3">Date</th>
              <th className="py-3">Amount</th>
              <th className="py-3">Status</th>
              <th className="text-end pe-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentOrders.length > 0 ? (
              currentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="ps-4">
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="bg-danger-subtle text-danger rounded-3 d-flex align-items-center justify-content-center"
                        style={{
                          width: "42px",
                          height: "42px",
                        }}
                      >
                        <ShoppingCart size={18} />
                      </div>

                      <div>
                        <div className="fw-semibold">ord#{order.id}</div>

                        <small className="text-muted">Order</small>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="fw-semibold">
                      {order.first_name} {order.last_name}
                    </div>

                    <small className="text-muted">Customer</small>
                  </td>

                  <td>
                    <span className="text-muted">
                      {formatDate(order.created_at)}
                    </span>
                  </td>

                  <td>
                    <span className="fw-bold">
                      ${formatPrice(order.total_price)}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`badge rounded-pill px-3 py-2 ${getStatusStyle(
                        order.status,
                      )}`}
                    >
                      {formatStatus(order.status)}
                    </span>
                  </td>

                  <td className="text-end pe-4">
                    <button
                      onClick={() => navigate(`/admin/orders/AdminOrderView/${order.id}`)}
                      type="button"
                      className="btn btn-outline-danger btn-sm  border rounded-3"
                      title="View order"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-5">
                  <div className="d-flex flex-column align-items-center">
                    <div
                      className="bg-light rounded-circle d-flex align-items-center justify-content-center mb-3"
                      style={{
                        width: "64px",
                        height: "64px",
                      }}
                    >
                      <ShoppingCart size={28} className="text-muted" />
                    </div>

                    <h6 className="fw-semibold">No orders found</h6>

                    <p className="text-muted small mb-0">
                      Try changing your search or status filter.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredOrders.length > 0 && (
        <div className="border-top bg-white px-4 py-3">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <small className="text-muted">
              Showing{" "}
              <span className="fw-semibold text-dark">{startIndex + 1}</span>-
              <span className="fw-semibold text-dark">
                {Math.min(startIndex + ordersPerPage, filteredOrders.length)}
              </span>{" "}
              of{" "}
              <span className="fw-semibold text-dark">
                {filteredOrders.length}
              </span>{" "}
              orders
            </small>

            {totalPages > 1 && (
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="page-link text-danger"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft size={16} />
                    </button>
                  </li>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1,
                  ).map((page) => (
                    <li key={page} className="page-item">
                      <button
                        type="button"
                        className={`page-link ${
                          currentPage === page
                            ? "bg-danger text-white border-danger"
                            : "text-danger"
                        }`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    </li>
                  ))}

                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="page-link text-danger"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
