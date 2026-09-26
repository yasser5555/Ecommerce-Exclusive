 
import { Trash2, AlertTriangle } from "lucide-react";
import React, { useMemo, useState } from "react";

export default function User_table({
  users = [],
  loading = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  onDelete,
  onStatusChange,
  onRoleChange,
  onFilterChange,
}) {
  const [userToDelete, setUserToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");

  const formatName = (user) => {
    try {
      const firstName = user?.first_name || "";
      const lastName = user?.last_name || "";

      return `${firstName} ${lastName}`.trim() || "Unknown User";
    } catch (error) {
      console.error(`error at User_table.formatName ${error}`);
      return "Unknown User";
    }
  };

  const formatDate = (value) => {
    try {
      const date = new Date(value);

      return isNaN(date.getTime())
        ? "N/A"
        : date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
    } catch (error) {
      console.error(`error at User_table.formatDate ${error}`);
      return "N/A";
    }
  };

  const handleDelete = async () => {
    if (!userToDelete || !onDelete) return;

    try {
      setDeleting(true);

      await onDelete(userToDelete.id);

      // Close modal after successful deletion
      setUserToDelete(null);
    } catch (error) {
      console.error(`error at User_table.handleDelete ${error}`);
    } finally {
      setDeleting(false);
    }
  };

  const handleStatusChange = async (userId, value) => {
    try {
      if (onStatusChange) {
        await onStatusChange(userId, value);
      }
    } catch (error) {
      console.error(`error at User_table.handleStatusChange ${error}`);
    }
  };

  const handleRoleChange = async (userId, value) => {
    try {
      if (onRoleChange) {
        await onRoleChange(userId, value);
      }
    } catch (error) {
      console.error(`error at User_table.handleRoleChange ${error}`);
    }
  };

  const getInitial = (user) => {
    return formatName(user).charAt(0).toUpperCase();
  };

  const filteredUsers = users;

  const handleStatusFilterChange = (value) => {
    const nextStatus = value || "all";
    setStatusFilter(nextStatus);
    if (onFilterChange) {
      onFilterChange(nextStatus, roleFilter);
    }
  };

  const handleRoleFilterChange = (value) => {
    const nextRole = value || "all";
    setRoleFilter(nextRole);
    if (onFilterChange) {
      onFilterChange(statusFilter, nextRole);
    }
  };

  return (
    <>
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        {/* Header */}
        <div className="card-header bg-white border-bottom px-4 py-3">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="fw-bold mb-1">Users</h5>
              <p className="text-muted small mb-0">
                Manage users, roles and account status
              </p>
            </div>

            <span className="badge bg-danger-subtle text-danger rounded-pill px-3 py-2">
              {filteredUsers.length} users
            </span>
          </div>
        </div>

        <div className="px-4 py-3 border-bottom bg-light-subtle">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div className="d-flex flex-wrap gap-3 align-items-center">
              <div className="d-flex align-items-center gap-2">
                <label className="small text-muted mb-0 fw-semibold">Status</label>
                <select
                  className="form-select form-select-sm rounded-pill border-0 bg-white shadow-sm"
                  style={{ minWidth: "135px" }}
                  value={statusFilter}
                  onChange={(event) => handleStatusFilterChange(event.target.value)}
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>

              <div className="d-flex align-items-center gap-2">
                <label className="small text-muted mb-0 fw-semibold">Role</label>
                <select
                  className="form-select form-select-sm rounded-pill border-0 bg-white shadow-sm"
                  style={{ minWidth: "130px" }}
                  value={roleFilter}
                  onChange={(event) => handleRoleFilterChange(event.target.value)}
                >
                  <option value="all">All</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-5 text-center">
            <div
              className="spinner-border text-danger mb-3"
              role="status"
              style={{ width: "2rem", height: "2rem" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>

            <div className="fw-semibold">Loading users...</div>

            <small className="text-muted">
              Please wait while we fetch the users.
            </small>
          </div>
        )}

        {/* Empty */}
        {!loading && filteredUsers.length === 0 && (
          <div className="py-5 text-center">
            <div
              className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
              style={{ width: "64px", height: "64px" }}
            >
              <span className="fs-4 text-muted">👤</span>
            </div>

            <h6 className="fw-bold mb-1">No users found</h6>

            <p className="text-muted small mb-0">
              No users match the current filter.
            </p>
          </div>
        )}

        {/* Table */}
        {!loading && filteredUsers.length > 0 && (
          <>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="ps-4 text-uppercase small text-muted fw-semibold">
                      User
                    </th>

                    <th className="text-uppercase small text-muted fw-semibold">
                      Phone
                    </th>

                    <th className="text-uppercase small text-muted fw-semibold">
                      Joined
                    </th>

                    <th className="text-uppercase small text-muted fw-semibold">
                      Status
                    </th>

                    <th className="text-uppercase small text-muted fw-semibold">
                      Role
                    </th>

                    <th className="text-end pe-4 text-uppercase small text-muted fw-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user) => {
                    const status = String(
                      user.status || "active"
                    ).toLowerCase();

                    const role = String(
                      user.role || "user"
                    ).toLowerCase();

                    return (
                      <tr key={user.id}>
                        {/* User */}
                        <td className="ps-4">
                          <div className="d-flex align-items-center gap-3">
                            <div
                              className="bg-danger-subtle text-danger rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                              style={{
                                width: "44px",
                                height: "44px",
                              }}
                            >
                              {getInitial(user)}
                            </div>

                            <div>
                              <div className="fw-semibold text-dark">
                                {formatName(user)}
                              </div>

                              <div className="text-muted small">
                                {user.email || "No email"}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Phone */}
                        <td>
                          <span className="text-muted small">
                            {user.phone_number || "N/A"}
                          </span>
                        </td>

                        {/* Joined */}
                        <td>
                          <span className="text-muted small">
                            {formatDate(user.created_at)}
                          </span>
                        </td>

                        {/* Status */}
                        <td>
                          <select
                            className={`form-select form-select-sm rounded-pill border-0 fw-semibold ${
                              status === "active"
                                ? "bg-success-subtle text-success"
                                : "bg-danger-subtle text-danger"
                            }`}
                            style={{ width: "115px" }}
                            value={status}
                            onChange={(event) =>
                              handleStatusChange(
                                user.id,
                                event.target.value
                              )
                            }
                          >
                            <option value="active">Active</option>
                            <option value="blocked">Blocked</option>
                          </select>
                        </td>

                        {/* Role */}
                        <td>
                          <select
                            className={`form-select form-select-sm rounded-pill border-0 fw-semibold ${
                              role === "admin"
                                ? "bg-danger-subtle text-danger"
                                : "bg-light text-dark"
                            }`}
                            style={{ width: "110px" }}
                            value={role}
                            onChange={(event) =>
                              handleRoleChange(
                                user.id,
                                event.target.value
                              )
                            }
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="text-end pe-4">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger rounded-3"
                            onClick={() => setUserToDelete(user)}
                            title="Delete user"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="border-top px-4 py-3 bg-white">
              <div className="d-flex justify-content-between align-items-center">
                <div className="text-muted small">
                  Page{" "}
                  <span className="fw-semibold text-dark">
                    {currentPage}
                  </span>{" "}
                  of{" "}
                  <span className="fw-semibold text-dark">
                    {totalPages}
                  </span>
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary rounded-3 px-3"
                    disabled={currentPage === 1}
                    onClick={() =>
                      onPageChange &&
                      onPageChange(
                        Math.max(1, currentPage - 1)
                      )
                    }
                  >
                    ← Previous
                  </button>

                  <button
                    type="button"
                    className="btn btn-sm btn-danger rounded-3 px-3"
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      onPageChange &&
                      onPageChange(
                        Math.min(
                          totalPages,
                          currentPage + 1
                        )
                      )
                    }
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {userToDelete && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          aria-modal="true"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
              {/* Modal Header */}
              <div className="modal-header border-0 pb-0 px-4 pt-4">
                <div
                  className="bg-danger-subtle text-danger rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "48px",
                    height: "48px",
                  }}
                >
                  <AlertTriangle size={22} />
                </div>

                <button
                  type="button"
                  className="btn-close ms-auto"
                  onClick={() => setUserToDelete(null)}
                  disabled={deleting}
                  aria-label="Close"
                />
              </div>

              {/* Modal Body */}
              <div className="modal-body px-4 pt-3 pb-4">
                <h5 className="fw-bold mb-2">
                  Delete user?
                </h5>

                <p className="text-muted mb-3">
                  Are you sure you want to permanently delete{" "}
                  <strong className="text-dark">
                    {formatName(userToDelete)}
                  </strong>
                  ?
                </p>

                <div className="alert alert-danger-subtle border-0 rounded-3 small mb-0">
                  <strong>Warning:</strong> This action cannot
                  be undone.
                </div>
              </div>

              {/* Modal Footer */}
              <div className="modal-footer border-0 px-4 pb-4 pt-0">
                <button
                  type="button"
                  className="btn btn-light border rounded-3 px-4"
                  onClick={() => setUserToDelete(null)}
                  disabled={deleting}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="btn btn-danger rounded-3 px-4 d-flex align-items-center gap-2"
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                      />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 size={16} />
                      Delete User
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

