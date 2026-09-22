import React, { useState } from "react";
import {
  Search,
  Eye,
  UserPlus,
  Users as UsersIcon,
  UserCheck,
  UserX,
} from "lucide-react";

export default function Users() {
  const [search, setSearch] = useState("");

  const users = [
    {
      id: 1,
      name: "Mohamed Yasser",
      email: "mohamed@example.com",
      phone: "01012345678",
      joined: "Sep 10, 2026",
      status: "Active",
    },
    {
      id: 2,
      name: "Ahmed Ali",
      email: "ahmed@example.com",
      phone: "01112345678",
      joined: "Sep 8, 2026",
      status: "Active",
    },
    {
      id: 3,
      name: "Sara Hassan",
      email: "sara@example.com",
      phone: "01212345678",
      joined: "Sep 5, 2026",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Omar Khaled",
      email: "omar@example.com",
      phone: "01512345678",
      joined: "Aug 30, 2026",
      status: "Active",
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="container-fluid bg-light min-vh-100 p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Users</h3>

          <p className="text-muted mb-0">Manage your store customers</p>
        </div>

        <button className="btn btn-dark d-flex gap-2 align-items-center">
          <UserPlus size={18} />
          Add User
        </button>
      </div>

      {/* Stats */}

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between">
                <div>
                  <small className="text-muted">Total Users</small>

                  <h3 className="fw-bold">3,420</h3>
                </div>

                <UsersIcon className="text-primary" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <small className="text-muted">Active Users</small>

              <h3 className="fw-bold text-success">3,180</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <small className="text-muted">Inactive Users</small>

              <h3 className="fw-bold text-danger">240</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Users */}

      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-header bg-white border-0 p-4">
          <div className="input-group">
            <span className="input-group-text bg-light border-0">
              <Search size={18} />
            </span>

            <input
              className="form-control bg-light border-0"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4">User</th>

                <th>Phone</th>

                <th>Joined</th>

                <th>Status</th>

                <th className="text-end pe-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="ps-4">
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center"
                        style={{
                          width: "42px",
                          height: "42px",
                        }}
                      >
                        {user.name.charAt(0)}
                      </div>

                      <div>
                        <div className="fw-semibold">{user.name}</div>

                        <small className="text-muted">{user.email}</small>
                      </div>
                    </div>
                  </td>

                  <td>{user.phone}</td>

                  <td>{user.joined}</td>

                  <td>
                    <span
                      className={`badge rounded-pill px-3 py-2 ${
                        user.status === "Active"
                          ? "bg-success-subtle text-success"
                          : "bg-danger-subtle text-danger"
                      }`}
                    >
                      {user.status}
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
