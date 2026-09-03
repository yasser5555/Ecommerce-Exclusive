import React from "react";
import { Outlet } from "react-router-dom";

// import Navbar from "../shared";
import Footer from "../Components/Footer"; 
import Navbar from "../Components/Navbar";

export default function MainLayout() {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}