import React from "react";
import { Outlet } from "react-router-dom";

import ProtectedRoute from "../../features/auth/routes/ProtectedRoute";
// import Sidebar from "../../features/Admin/Component/Sidebar";
import Sidebar from "../Components/Sidebar";

export default function AdminLayout() {
  return (
    <ProtectedRoute>
      <div className="d-flex min-vh-100">
        <Sidebar />

        <main className="flex-grow-1 min-vh-100">
          <Outlet />
        </main>
      </div>
    </ProtectedRoute>
  );
}