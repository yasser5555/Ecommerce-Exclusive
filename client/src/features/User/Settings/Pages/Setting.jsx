import React, { useState } from "react";
import {
  User,
  Lock,
  Bell,
  Palette,
  Shield,
  Trash2,
  ChevronRight,
  Check,
  MessageCircle,
} from "lucide-react";

export default function Setting() {
  const [activeSection, setActiveSection] = useState("account");
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [orderNotifications, setOrderNotifications] = useState(true);
  const [promotionNotifications, setPromotionNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const adminMessages = [
    {
      id: 1,
      adminName: "Mohamed Yasser",
      adminImage: "/images/admin.jpg",
      title: "Welcome to Exclusive",
      message:
        "Welcome to Exclusive! We are happy to have you with us. Explore our latest products and offers.",
      date: "September 18, 2026",
      unread: true,
    },
    {
      id: 2,
      adminName: "Ahmed Mohamed",
      adminImage: "/images/admin2.jpg",
      title: "New Products Available",
      message:
        "We have added new products to our store. Check out the latest collection.",
      date: "September 15, 2026",
      unread: false,
    },
    {
      id: 3,
      adminName: "Exclusive Admin",
      adminImage: "/images/admin3.jpg",
      title: "Maintenance Notice",
      message:
        "The website may be temporarily unavailable during scheduled maintenance.",
      date: "September 10, 2026",
      unread: false,
    },
  ];

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="mb-5">
        <h2 className="fw-bold mb-2">Settings</h2>

        <p className="text-secondary mb-0">
          Manage your account preferences and security settings.
        </p>
      </div>

      <div className="row g-4">
        {/* Sidebar */}
        <div className="col-lg-3">
          <div className="card border-0 shadow-sm rounded-4 p-2">
           
            {/* Notifications */}
           

            {/* Messages */}
            <button
              className={`btn text-start d-flex align-items-center gap-3 rounded-3 p-3 ${
                activeSection === "messages"
                  ? "btn-danger text-white"
                  : "btn-light"
              }`}
              onClick={() => setActiveSection("messages")}
            >
              <MessageCircle size={20} />

              <span className="fw-semibold">Admin Messages</span>

              <ChevronRight size={17} className="ms-auto" />
            </button>

            {/* Appearance */}
            <button
              className={`btn text-start d-flex align-items-center gap-3 rounded-3 p-3 ${
                activeSection === "appearance"
                  ? "btn-danger text-white"
                  : "btn-light"
              }`}
              onClick={() => setActiveSection("appearance")}
            >
              <Palette size={20} />

              <span className="fw-semibold">Appearance</span>

              <ChevronRight size={17} className="ms-auto" />
            </button>

            {/* Security */}
            <button
              className={`btn text-start d-flex align-items-center gap-3 rounded-3 p-3 ${
                activeSection === "security"
                  ? "btn-danger text-white"
                  : "btn-light"
              }`}
              onClick={() => setActiveSection("security")}
            >
              <Shield size={20} />

              <span className="fw-semibold">Security</span>

              <ChevronRight size={17} className="ms-auto" />
            </button>

            {/* Danger Zone */}
            <button
              className={`btn text-start d-flex align-items-center gap-3 rounded-3 p-3 ${
                activeSection === "danger"
                  ? "btn-danger text-white"
                  : "btn-light"
              }`}
              onClick={() => setActiveSection("danger")}
            >
              <Trash2 size={20} />

              <span className="fw-semibold">Danger Zone</span>

              <ChevronRight size={17} className="ms-auto" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="col-lg-9">
          {/* Account */}
          {activeSection === "account" && (
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4 p-md-5">
                <div className="mb-4">
                  <h4 className="fw-bold mb-1">Account Settings</h4>

                  <p className="text-secondary">
                    Manage your personal account information.
                  </p>
                </div>

                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">First Name</label>

                    <input
                      type="text"
                      className="form-control form-control-lg rounded-3"
                      placeholder="First name"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Last Name</label>

                    <input
                      type="text"
                      className="form-control form-control-lg rounded-3"
                      placeholder="Last name"
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      Email Address
                    </label>

                    <input
                      type="email"
                      className="form-control form-control-lg rounded-3"
                      placeholder="example@email.com"
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      Phone Number
                    </label>

                    <input
                      type="text"
                      className="form-control form-control-lg rounded-3"
                      placeholder="+20 100 000 0000"
                    />
                  </div>

                  <div className="col-12">
                    <button className="btn btn-danger px-4 py-2 rounded-3 fw-semibold">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeSection === "notifications" && (
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4 p-md-5">
                <div className="mb-4">
                  <h4 className="fw-bold mb-1">Notifications</h4>

                  <p className="text-secondary">
                    Choose which notifications you want to receive.
                  </p>
                </div>

                {/* Email */}
                <div className="border rounded-4 p-3 mb-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="fw-bold mb-1">Email Notifications</h6>

                      <small className="text-secondary">
                        Receive important updates through email.
                      </small>
                    </div>

                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={emailNotifications}
                        onChange={(e) =>
                          setEmailNotifications(e.target.checked)
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Orders */}
                <div className="border rounded-4 p-3 mb-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="fw-bold mb-1">Order Updates</h6>

                      <small className="text-secondary">
                        Get notified when your order status changes.
                      </small>
                    </div>

                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={orderNotifications}
                        onChange={(e) =>
                          setOrderNotifications(e.target.checked)
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Promotions */}
                <div className="border rounded-4 p-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="fw-bold mb-1">
                        Promotional Notifications
                      </h6>

                      <small className="text-secondary">
                        Receive offers, discounts and new product updates.
                      </small>
                    </div>

                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={promotionNotifications}
                        onChange={(e) =>
                          setPromotionNotifications(e.target.checked)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Admin Messages */}
          {activeSection === "messages" && (
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4 p-md-5">
                <div className="mb-4">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-danger-subtle text-danger rounded-3 p-3">
                      <MessageCircle size={24} />
                    </div>

                    <div>
                      <h4 className="fw-bold mb-1">Messages from Admin</h4>

                      <p className="text-secondary mb-0">
                        Important messages and updates from the administration.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Admin Messages */}
                {activeSection === "messages" && (
                  <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-body p-4 p-md-5">
                      {/* Header */}
                      <div className="mb-4">
                        <div className="d-flex align-items-center gap-3">
                          <div className="bg-danger-subtle text-danger rounded-3 p-3">
                            <MessageCircle size={24} />
                          </div>

                          <div>
                            <h4 className="fw-bold mb-1">
                              Messages from Admin
                            </h4>

                            <p className="text-secondary mb-0">
                              Important messages and updates from the
                              administration.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Messages */}
                      {adminMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`border rounded-4 p-4 mb-3 ${
                            message.unread ? "border-danger-subtle" : ""
                          }`}
                        >
                          {/* Admin Info */}
                          <div className="d-flex align-items-center gap-3 mb-3">
                            <img
                              src={message.adminImage}
                              alt={message.adminName}
                              width="48"
                              height="48"
                              className="rounded-circle object-fit-cover"
                            />

                            <div className="flex-grow-1">
                              <div className="d-flex align-items-center gap-2">
                                <h6 className="fw-bold mb-0">
                                  {message.adminName}
                                </h6>

                                {message.unread && (
                                  <span className="badge bg-danger">New</span>
                                )}
                              </div>

                              <small className="text-secondary">
                                Administrator
                              </small>
                            </div>

                            {message.unread && (
                              <span
                                className="bg-danger rounded-circle flex-shrink-0"
                                style={{
                                  width: "9px",
                                  height: "9px",
                                }}
                              ></span>
                            )}
                          </div>

                          {/* Message Content */}
                          <div className="ps-md-5">
                            <h6 className="fw-bold mb-2">{message.title}</h6>

                            <p className="text-secondary mb-2">
                              {message.message}
                            </p>

                            <small className="text-secondary">
                              {message.date}
                            </small>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Appearance */}
          {activeSection === "appearance" && (
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4 p-md-5">
                <div className="mb-4">
                  <h4 className="fw-bold mb-1">Appearance</h4>

                  <p className="text-secondary">
                    Customize how the website looks for you.
                  </p>
                </div>

                <div className="border rounded-4 p-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="fw-bold mb-1">Dark Mode</h6>

                      <p className="text-secondary mb-0">
                        Switch between light and dark appearance.
                      </p>
                    </div>

                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={darkMode}
                        onChange={(e) => setDarkMode(e.target.checked)}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="form-label fw-semibold">Language</label>

                  <select className="form-select form-select-lg rounded-3">
                    <option>English</option>
                    <option>Arabic</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Security */}
          {activeSection === "security" && (
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4 p-md-5">
                <div className="mb-4">
                  <h4 className="fw-bold mb-1">Security</h4>

                  <p className="text-secondary">Keep your account secure.</p>
                </div>

                <div className="border rounded-4 p-4 mb-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-danger-subtle text-danger rounded-3 p-3">
                      <Lock size={22} />
                    </div>

                    <div>
                      <h6 className="fw-bold mb-1">Change Password</h6>

                      <p className="text-secondary mb-0">
                        Update your account password.
                      </p>
                    </div>

                    <button className="btn btn-outline-danger ms-auto">
                      Change
                    </button>
                  </div>
                </div>

                <div className="border rounded-4 p-4">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-success-subtle text-success rounded-3 p-3">
                      <Shield size={22} />
                    </div>

                    <div>
                      <h6 className="fw-bold mb-1">Account Protection</h6>

                      <p className="text-secondary mb-0">
                        Your account security settings are active.
                      </p>
                    </div>

                    <Check size={24} className="text-success ms-auto" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Danger Zone */}
          {activeSection === "danger" && (
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4 p-md-5">
                <div className="mb-4">
                  <h4 className="fw-bold text-danger mb-1">Danger Zone</h4>

                  <p className="text-secondary">
                    These actions can permanently affect your account.
                  </p>
                </div>

                <div className="border border-danger rounded-4 p-4">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-danger text-white rounded-3 p-3">
                      <Trash2 size={22} />
                    </div>

                    <div>
                      <h6 className="fw-bold mb-1">Delete Account</h6>

                      <p className="text-secondary mb-0">
                        Permanently delete your account and associated data.
                      </p>
                    </div>

                    <button className="btn btn-danger ms-auto">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
