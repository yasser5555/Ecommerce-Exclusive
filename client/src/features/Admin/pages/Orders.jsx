import React, { useState } from "react";
import {
  Search,
  Eye,
  ShoppingCart,
  DollarSign,
  Clock,
  CheckCircle,
} from "lucide-react";

export default function Orders() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const orders = [
    {
      id: "ORD-1025",
      customer: "Mohamed Yasser",
      date: "Sep 18, 2026",
      amount: 240,
      status: "Delivered",
    },
    {
      id: "ORD-1024",
      customer: "Ahmed Ali",
      date: "Sep 18, 2026",
      amount: 185,
      status: "Processing",
    },
    {
      id: "ORD-1023",
      customer: "Sara Hassan",
      date: "Sep 17, 2026",
      amount: 95,
      status: "Pending",
    },
    {
      id: "ORD-1022",
      customer: "Omar Khaled",
      date: "Sep 17, 2026",
      amount: 320,
      status: "Cancelled",
    },
    {
      id: "ORD-1021",
      customer: "Ali Mohamed",
      date: "Sep 16, 2026",
      amount: 150,
      status: "Delivered",
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status === "All" || order.status === status;

    return matchesSearch && matchesStatus;
  });

  const getStatusClass = (status) => {
    if (status === "Delivered") return "bg-success-subtle text-success";

    if (status === "Processing") return "bg-primary-subtle text-primary";

    if (status === "Pending") return "bg-warning-subtle text-warning";

    return "bg-danger-subtle text-danger";
  };

  return (
    <div className="container-fluid bg-light min-vh-100 p-4">
      <div className="mb-4">
        <h3 className="fw-bold mb-1">Orders</h3>

        <p className="text-muted mb-0">Manage and track customer orders</p>
      </div>

      {/* Stats */}

      <div className="row g-3 mb-4">
        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between">
                <div>
                  <small className="text-muted">Total Orders</small>

                  <h3 className="fw-bold">1,248</h3>
                </div>

                <ShoppingCart className="text-primary" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <small className="text-muted">Pending</small>

              <h3 className="fw-bold text-warning">24</h3>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <small className="text-muted">Delivered</small>

              <h3 className="fw-bold text-success">986</h3>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <small className="text-muted">Revenue</small>

              <h3 className="fw-bold">$24,580</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}

      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-header bg-white border-0 p-4">
          <div className="row g-3">
            <div className="col-md-7">
              <div className="input-group">
                <span className="input-group-text bg-light border-0">
                  <Search size={18} />
                </span>

                <input
                  className="form-control bg-light border-0"
                  placeholder="Search order or customer..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-5">
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>All</option>
                <option>Pending</option>
                <option>Processing</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4">Order</th>

                <th>Customer</th>

                <th>Date</th>

                <th>Amount</th>

                <th>Status</th>

                <th className="text-end pe-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="ps-4 fw-bold">#{order.id}</td>

                  <td>{order.customer}</td>

                  <td className="text-muted">{order.date}</td>

                  <td className="fw-semibold">${order.amount}</td>

                  <td>
                    <span
                      className={`badge rounded-pill px-3 py-2 ${getStatusClass(
                        order.status,
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="text-end pe-4">
                    <button className="btn btn-sm btn-light">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
