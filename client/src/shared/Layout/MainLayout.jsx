import React from "react";
import { Outlet } from "react-router-dom";

// import Navbar from "../shared";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import ProtectedRoute from "../../features/auth/routes/ProtectedRoute";

export default function MainLayout() {
  return (
    <>
      <ProtectedRoute>
        <Navbar />

        <main>
          <Outlet />
        </main>
        <Footer />
      </ProtectedRoute>
    </>
  );
}
