import React, { useState } from "react";
import {
  Settings as SettingsIcon,
  Store,
  Bell,
  Shield,
  Save,
} from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="container-fluid bg-light min-vh-100 p-4">
      {/* Header */}

      <div className="mb-4">
        <h3 className="fw-bold mb-1">Settings</h3>

        <p className="text-muted mb-0">
          Manage your store settings and preferences
        </p>
      </div>

      <div className="row g-4">
        {/* Settings Navigation */}

        <div className="col-lg-3">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-3">
              <button
                onClick={() => setActiveTab("general")}
                className={`btn w-100 text-start d-flex align-items-center gap-3 mb-2 ${
                  activeTab === "general" ? "btn-dark" : "btn-light"
                }`}
              >
                <SettingsIcon size={18} />
                General
              </button>

              <button
                onClick={() => setActiveTab("store")}
                className={`btn w-100 text-start d-flex align-items-center gap-3 mb-2 ${
                  activeTab === "store" ? "btn-dark" : "btn-light"
                }`}
              >
                <Store size={18} />
                Store
              </button>

              <button
                onClick={() => setActiveTab("notifications")}
                className={`btn w-100 text-start d-flex align-items-center gap-3 mb-2 ${
                  activeTab === "notifications" ? "btn-dark" : "btn-light"
                }`}
              >
                <Bell size={18} />
                Notifications
              </button>

              <button
                onClick={() => setActiveTab("security")}
                className={`btn w-100 text-start d-flex align-items-center gap-3 ${
                  activeTab === "security" ? "btn-dark" : "btn-light"
                }`}
              >
                <Shield size={18} />
                Security
              </button>
            </div>
          </div>
        </div>

        {/* Settings Content */}

        <div className="col-lg-9">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              {/* General */}

              {activeTab === "general" && (
                <>
                  <h5 className="fw-bold mb-1">General Settings</h5>

                  <p className="text-muted">
                    Configure general admin preferences.
                  </p>

                  <hr />

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Admin Name</label>

                    <input className="form-control" value="Admin" readOnly />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Admin Email
                    </label>

                    <input
                      className="form-control"
                      value="admin@example.com"
                      readOnly
                    />
                  </div>
                </>
              )}

              {/* Store */}

              {activeTab === "store" && (
                <>
                  <h5 className="fw-bold mb-1">Store Settings</h5>

                  <p className="text-muted">Manage your store information.</p>

                  <hr />

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Store Name</label>

                    <input
                      className="form-control"
                      defaultValue="Execlusive Ecommerce"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Store Email
                    </label>

                    <input
                      type="email"
                      className="form-control"
                      defaultValue="support@example.com"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Currency</label>

                    <select className="form-select">
                      <option>USD</option>
                      <option>EGP</option>
                      <option>EUR</option>
                    </select>
                  </div>
                </>
              )}

              {/* Notifications */}

              {activeTab === "notifications" && (
                <>
                  <h5 className="fw-bold mb-1">Notifications</h5>

                  <p className="text-muted">
                    Choose which notifications you want to receive.
                  </p>

                  <hr />

                  <div className="form-check form-switch mb-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultChecked
                    />

                    <label className="form-check-label fw-semibold">
                      New Orders
                    </label>

                    <div className="text-muted small">
                      Notify me when a new order is created.
                    </div>
                  </div>

                  <div className="form-check form-switch mb-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultChecked
                    />

                    <label className="form-check-label fw-semibold">
                      Low Stock
                    </label>

                    <div className="text-muted small">
                      Notify me when products are running low.
                    </div>
                  </div>

                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" />

                    <label className="form-check-label fw-semibold">
                      Marketing Emails
                    </label>
                  </div>
                </>
              )}

              {/* Security */}

              {activeTab === "security" && (
                <>
                  <h5 className="fw-bold mb-1">Security</h5>

                  <p className="text-muted">Manage your account security.</p>

                  <hr />

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Current Password
                    </label>

                    <input type="password" className="form-control" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      New Password
                    </label>

                    <input type="password" className="form-control" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Confirm Password
                    </label>

                    <input type="password" className="form-control" />
                  </div>
                </>
              )}

              {/* Save */}

              <div className="border-top pt-4 mt-4">
                <button className="btn btn-dark d-flex align-items-center gap-2">
                  <Save size={17} />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
