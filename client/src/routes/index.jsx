import { Navigate, createBrowserRouter } from "react-router-dom";

import { authRoutes } from "../features/auth/routes/auth.routes";
import { profileRoutes } from "../features/Profile/routes/profile.routes";

import MainLayout from "../shared/Layout/MainLayout";
import { productsRoutes } from "../features/Products/routes/Products.routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth/login" replace />,
  },

  // Auth routes WITHOUT Navbar and Footer
  authRoutes,

  // Main application routes WITH Navbar and Footer
  {
    element: <MainLayout />,
    children: [
      profileRoutes,
      productsRoutes
    ],
  },
]);