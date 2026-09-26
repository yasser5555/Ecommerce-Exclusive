import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Lock, LogOut, ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";

export default function BlockedAccountPage() {
  // This gets the auth store actions so the user can log out safely.
  const { user, logout } = useAuth();
  // This gives the component access to route navigation after logout.
  const navigate = useNavigate();

  // This handles the logout action when the user chooses to leave the blocked screen.
  const handleLogout = async () => {
    try {
      // This clears the saved token and user state from storage.
      logout();
      // This sends the user back to the login page after logging out.
      navigate("/auth/login", { replace: true });
    } catch (error) {
      // This logs any unexpected failure during logout.
      console.error(`error at BlockedAccountPage.handleLogout ${error}`);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center px-3 py-5"
      style={{
        background:
          "radial-gradient(circle at top, rgba(239,68,68,0.18), transparent 35%), linear-gradient(135deg, #fff5f5 0%, #fff 28%, #f8fafc 100%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="w-100 d-flex justify-content-center"
      >
        <div
          className="border-0 shadow-lg rounded-4 overflow-hidden"
          style={{
            maxWidth: "720px",
            width: "100%",
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(239,68,68,0.1)",
          }}
        >
          <div className="p-4 p-md-5">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.45 }}
              className="d-flex align-items-center justify-content-center mx-auto mb-4 rounded-circle"
              style={{
                width: "110px",
                height: "110px",
                background: "linear-gradient(135deg, #ff6b6b, #ef4444)",
                boxShadow: "0 18px 40px rgba(239, 68, 68, 0.25)",
              }}
            >
              <ShieldAlert size={46} color="#fff" />
            </motion.div>

            <div className="text-center mb-4">
              <span
                className="badge rounded-pill px-3 py-2 mb-3"
                style={{ background: "#fff1f2", color: "#b91c1c" }}
              >
                Account Restricted
              </span>
              <h1 className="fw-bold mb-3 text-dark" style={{ fontSize: "2.4rem" }}>
                Your account has been blocked
              </h1>
              <p className="text-muted mb-0" style={{ fontSize: "1.05rem", lineHeight: "1.8" }}>
                This account is currently suspended and cannot access the platform.
                Please contact support or request a review to regain access.
              </p>
            </div>

            <div className="row g-3 mb-4 mt-2">
              <div className="col-md-6">
                <div className="rounded-4 p-3 border h-100" style={{ background: "#fff7ed" }}>
                  <div className="d-flex align-items-center gap-2 mb-2 text-warning">
                    <AlertTriangle size={18} />
                    <small className="fw-semibold text-uppercase">Status</small>
                  </div>
                  <div className="fw-bold text-dark">Blocked</div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="rounded-4 p-3 border h-100" style={{ background: "#eff6ff" }}>
                  <div className="d-flex align-items-center gap-2 mb-2 text-primary">
                    <Lock size={18} />
                    <small className="fw-semibold text-uppercase">Access</small>
                  </div>
                  <div className="fw-bold text-dark">Restricted</div>
                </div>
              </div>
            </div>

            <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
              <a
                className="btn btn-lg rounded-pill px-4 fw-semibold text-decoration-none"
                style={{
                  background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                  color: "#fff",
                  border: "none",
                }}
                href="mailto:support@exclusive.com?subject=Blocked%20Account%20Support"
              >
                Contact Support
              </a>
              <button
                className="btn btn-lg rounded-pill px-4 fw-semibold"
                style={{
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  color: "#fff",
                  border: "none",
                }}
                onClick={handleLogout}
              >
                <span className="d-flex align-items-center gap-2">
                  <LogOut size={18} />
                  Log out
                </span>
              </button>
            </div>

            <div className="mt-4 text-center small text-muted">
              {user?.email
                ? `Contact support for: ${user.email}`
                : "Please contact support to resolve this issue."}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
