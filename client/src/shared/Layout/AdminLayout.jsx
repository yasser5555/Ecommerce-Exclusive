import React from "react";
import { Outlet } from "react-router-dom";

 import ProtectedRoute from "../../features/auth/routes/ProtectedRoute";
import Sidebar from "../../features/Admin/Component/Sidebar";
 
export default function AdminLayout() {
  return (
    <ProtectedRoute>
      <div className="d-flex">
        <Sidebar />
        <main
          style={{
            marginLeft: "260px",
            width: "calc(100% - 260px)",
      
          }}
        >
          <Outlet />
        </main>
      </div>
    </ProtectedRoute>
  );
}