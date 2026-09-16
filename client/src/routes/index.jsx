import { Navigate, createBrowserRouter } from "react-router-dom";

import { authRoutes } from "../features/auth/routes/auth.routes";
import { profileRoutes } from "../features/Profile/routes/profile.routes";

import MainLayout from "../shared/Layout/MainLayout";
import { productsRoutes } from "../features/Products/routes/Products.routes";
import { WishlistRoutes } from "../features/Wishlist/routes/Wishlist.routes";
import { CartRoutes } from "../features/Cart/routes/Cart.routes";
import { HomeRoutes } from "../features/Home/routes/Home.routes";
import { AboutRoutes } from "../features/About/routes/About.routes";
import { CheckoutRoutes } from "../features/Checkout/routes/checkout.routes";
import { OrderRoutes } from "../features/Order/routes/order.routes";

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
      WishlistRoutes,
      CartRoutes,
      HomeRoutes,
      AboutRoutes,
      CheckoutRoutes,
      OrderRoutes,
    ],
  },
]);