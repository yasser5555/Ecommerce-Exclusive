import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";

import ProtectedRoute from "../../features/auth/routes/ProtectedRoute";
import Sidebar from "../Components/Sidebar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ProtectedRoute>
      <div className="d-flex min-vh-100 position-relative">
        
        {/* Sidebar */}

        <Sidebar sidebarOpen={sidebarOpen} />

        {/* Sidebar Toggle */}

        <button
          type="button"
          className="btn btn-light border shadow-sm d-flex align-items-center justify-content-center"
          onClick={() => setSidebarOpen((prev) => !prev)}
          title={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          style={{
            position: "fixed",
            top: "90%",
            left: "95%",
            width: "38px",
            height: "38px",
            borderRadius: "10px",
            zIndex: 1050,
            transition: "left 0.35s ease",
          }}
        >
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        {/* Main Content */}

        <main className="flex-grow-1 min-vh-100">
          <Outlet />
        </main>
      </div>
    </ProtectedRoute>
  );
}