import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

 
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import ProtectedRoute from "../../features/auth/routes/ProtectedRoute";
import scrollToTop from "../Utils/scrollToTop";

export default function MainLayout() {
  const { key } = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [key]);

  return (
    <ProtectedRoute>
      <>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-grow-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </>
    </ProtectedRoute>
  );
}
