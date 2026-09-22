import React from "react";
import { Outlet } from "react-router-dom";

 
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
