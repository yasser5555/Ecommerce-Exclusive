import React, { useEffect } from "react";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  ArrowUpRight,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  AlertTriangle,
  Plus,
  UserPlus,
  Eye,
} from "lucide-react";

import { useAdminStore } from "../Store/Admin.store";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { fetchDashBoard, Dashboard, loading } = useAdminStore();
  const Navigate = useNavigate();
  useEffect(() => {
    fetchDashBoard();
  }, []);

  // ==============================
  // Loading
  // ==============================

  if (loading || !Dashboard) {
    return (
      <div className="container-fluid py-5">
        <div className="d-flex justify-content-center align-items-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>

          <span className="ms-3 text-muted">Loading Dashboard...</span>
        </div>
      </div>
    );
  }

  // ==============================
  // Dashboard Data
  // ==============================

  const totalOrders = Dashboard?.[0]?.[0]?.total_orders ?? 0;
  const totalUsers = Dashboard?.[1]?.[0]?.total_users ?? 0;
  const totalProducts = Dashboard?.[2]?.[0]?.total_products ?? 0;
  const totalRevenue = Dashboard?.[3]?.[0]?.total_revenue ?? 0;
  const orderStatus = Dashboard?.[4]?.[0] ?? {
    pending: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
  };

  // NEW
  const recentOrdersData = Dashboard?.[5] ?? [];

  // LOW STOCK MOVED FROM [5] TO [6]
  const lowStockProducts = Dashboard?.[6] ?? [];

  // ==============================
  // Remove Duplicate Orders
  // ==============================

  const recentOrders = Array.from(
    new Map(recentOrdersData.map((order) => [order.id, order])).values(),
  );

  // ==============================
  // Order Status Percentage
  // ==============================

  const totalStatusOrders =
    Number(orderStatus.pending) +
    Number(orderStatus.processing) +
    Number(orderStatus.shipped) +
    Number(orderStatus.delivered) +
    Number(orderStatus.cancelled);

  const getPercentage = (value) => {
    if (totalStatusOrders === 0) return 0;

    return Math.round((Number(value) / totalStatusOrders) * 100);
  };

  // ==============================
  // Status Helpers
  // ==============================

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return (
          <span className="badge bg-warning-subtle text-warning">
            <Clock size={13} className="me-1" />
            Pending
          </span>
        );

      case "processing":
        return (
          <span className="badge bg-info-subtle text-info">
            <Package size={13} className="me-1" />
            Processing
          </span>
        );

      case "shipped":
        return (
          <span className="badge bg-primary-subtle text-primary">
            <Truck size={13} className="me-1" />
            Shipped
          </span>
        );

      case "delivered":
        return (
          <span className="badge bg-success-subtle text-success">
            <CheckCircle size={13} className="me-1" />
            Delivered
          </span>
        );

      case "cancelled":
        return (
          <span className="badge bg-danger-subtle text-danger">
            <XCircle size={13} className="me-1" />
            Cancelled
          </span>
        );

      default:
        return (
          <span className="badge bg-secondary-subtle text-secondary">
            {status}
          </span>
        );
    }
  };

  // ==============================
  // Format Date
  // ==============================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ==============================
  // Dashboard
  // ==============================

  return (
    <div className="container-fluid py-4">
      {/* ================================= */}
      {/* Header */}
      {/* ================================= */}

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <h2 className="fw-bold mb-1">Dashboard</h2>

          <p className="text-muted mb-0">
            Welcome back! Here's what's happening with your store.
          </p>
        </div>

       
      </div>

      {/* ================================= */}
      {/* Statistics Cards */}
      {/* ================================= */}

      <div className="row g-4 mb-4">
        {/* Revenue */}

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-2">Total Revenue</p>

                  <h3 className="fw-bold mb-2">
                    ${Number(totalRevenue).toLocaleString()}
                  </h3>

                  <small className="text-success">
                    <ArrowUpRight size={14} />
                    Store revenue
                  </small>
                </div>

                <div className="bg-success-subtle text-success rounded-3 p-3">
                  <DollarSign size={22} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Orders */}

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-2">Total Orders</p>

                  <h3 className="fw-bold mb-2">
                    {Number(totalOrders).toLocaleString()}
                  </h3>

                  <small className="text-muted">All orders</small>
                </div>

                <div className="bg-primary-subtle text-primary rounded-3 p-3">
                  <ShoppingCart size={22} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Users */}

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-2">Customers</p>

                  <h3 className="fw-bold mb-2">
                    {Number(totalUsers).toLocaleString()}
                  </h3>

                  <small className="text-muted">Registered users</small>
                </div>

                <div className="bg-info-subtle text-info rounded-3 p-3">
                  <Users size={22} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products */}

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-2">Total Products</p>

                  <h3 className="fw-bold mb-2">
                    {Number(totalProducts).toLocaleString()}
                  </h3>

                  <small className="text-muted">Products in store</small>
                </div>

                <div className="bg-warning-subtle text-warning rounded-3 p-3">
                  <Package size={22} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================= */}
      {/* Recent Orders + Order Overview */}
      {/* ================================= */}

      <div className="row g-4 mb-4">
        {/* Recent Orders */}

        <div className="col-12 col-xl-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h5 className="fw-bold mb-1">Recent Orders</h5>

                  <small className="text-muted">
                    Latest orders from your customers
                  </small>
                </div>
 
              </div>

              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentOrders.slice(0, 8).map((order) => (
                      <tr key={order.id}>
                        <td>
                          <span className="fw-semibold">#{order.id}</span>
                        </td>

                        <td>{order.first_name}</td>

                        <td className="text-muted">
                          {formatDate(order.created_at)}
                        </td>

                        <td className="fw-semibold">
                          ${Number(order.total_price).toLocaleString()}
                        </td>

                        <td>{getStatusBadge(order.status)}</td>
                      </tr>
                    ))}

                    {recentOrders.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center text-muted py-4">
                          No recent orders found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Order Overview */}

        <div className="col-12 col-xl-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="fw-bold mb-1">Order Overview</h5>

              <p className="text-muted small mb-4">Current order status</p>

              {/* Pending */}

              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="small">Pending</span>

                  <span className="small fw-semibold">
                    {orderStatus.pending}
                  </span>
                </div>

                <div className="progress" style={{ height: "7px" }}>
                  <div
                    className="progress-bar bg-warning"
                    style={{
                      width: `${getPercentage(orderStatus.pending)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Processing */}

              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="small">Processing</span>

                  <span className="small fw-semibold">
                    {orderStatus.processing}
                  </span>
                </div>

                <div className="progress" style={{ height: "7px" }}>
                  <div
                    className="progress-bar bg-info"
                    style={{
                      width: `${getPercentage(orderStatus.processing)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Shipped */}

              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="small">Shipped</span>

                  <span className="small fw-semibold">
                    {orderStatus.shipped}
                  </span>
                </div>

                <div className="progress" style={{ height: "7px" }}>
                  <div
                    className="progress-bar bg-primary"
                    style={{
                      width: `${getPercentage(orderStatus.shipped)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Delivered */}

              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="small">Delivered</span>

                  <span className="small fw-semibold">
                    {orderStatus.delivered}
                  </span>
                </div>

                <div className="progress" style={{ height: "7px" }}>
                  <div
                    className="progress-bar bg-success"
                    style={{
                      width: `${getPercentage(orderStatus.delivered)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Cancelled */}

              <div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="small">Cancelled</span>

                  <span className="small fw-semibold">
                    {orderStatus.cancelled}
                  </span>
                </div>

                <div className="progress" style={{ height: "7px" }}>
                  <div
                    className="progress-bar bg-danger"
                    style={{
                      width: `${getPercentage(orderStatus.cancelled)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================= */}
      {/* Low Stock Products */}
      {/* ================================= */}

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h5 className="fw-bold mb-1">Low Stock Products</h5>

              <small className="text-muted">
                Products that need your attention
              </small>
            </div>

            <AlertTriangle size={22} className="text-warning" />
          </div>

          <div className="row g-3">
            {lowStockProducts.map((product, index) => (
              <div
                className="col-12 col-md-6 col-xl-4"
                key={`${product.id}-${index}`}
              >
                <div className="border rounded-3 p-3 h-100">
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={product.product_image}
                      alt={product.title}
                      className="rounded"
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                      }}
                    />

                    <div className="flex-grow-1">
                      <h6
                        className="fw-semibold mb-1"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {product.title}
                      </h6>

                      <small className="text-muted">{product.catogery}</small>
                    </div>

                    <span className="badge bg-danger-subtle text-danger">
                      {product.stock} left
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {lowStockProducts.length === 0 && (
              <div className="col-12">
                <div className="text-center text-muted py-4">
                  No low stock products.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================================= */}
      {/* Quick Actions */}
      {/* ================================= */}

     
    </div>
  );
}
