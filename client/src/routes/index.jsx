import { Navigate, createBrowserRouter } from "react-router-dom";

import { authRoutes } from "../features/auth/routes/auth.routes";
import { profileRoutes } from "../features/Profile/routes/profile.routes";

import MainLayout from "../shared/Layout/MainLayout";
import { productsRoutes } from "../features/User/Products/routes/Products.routes";
import { WishlistRoutes } from "../features/User/Wishlist/routes/Wishlist.routes";
import { CartRoutes } from "../features/User/Cart/routes/Cart.routes";
import { HomeRoutes } from "../features/User/Home/routes/Home.routes";
import { AboutRoutes } from "../features/User/About/routes/About.routes";
import { CheckoutRoutes } from "../features/User/Checkout/routes/checkout.routes";
import { OrderRoutes } from "../features/User/Order/routes/order.routes";
import { ContactRoutes } from "../features/User/Contact/routes/contact.routes";
import { SettingsRoutes } from "../features/User/Settings/routes/setting.routes";
import { AdminRoutes } from "../features/Admin/routes/admin.routes";
import AdminLayout from "../shared/Layout/AdminLayout";
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
      ContactRoutes,
      SettingsRoutes,
    ],
  },
  {
    element:<AdminLayout/>,
    children:[AdminRoutes]
  }
], 
 
);
