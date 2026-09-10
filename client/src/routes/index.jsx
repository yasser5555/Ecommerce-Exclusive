import { Navigate, createBrowserRouter } from "react-router-dom";

import { authRoutes } from "../features/auth/routes/auth.routes";
import { profileRoutes } from "../features/Profile/routes/profile.routes";

import MainLayout from "../shared/Layout/MainLayout";
import { productsRoutes } from "../features/Products/routes/Products.routes";
import { WishlistRoutes } from "../features/Wishlist/routes/Wishlist.routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth/login" replace />,
  },
  authRoutes,
  {
    element: <MainLayout />,
    children: [
      profileRoutes,
      productsRoutes,
      WishlistRoutes
    ],
  },
]);