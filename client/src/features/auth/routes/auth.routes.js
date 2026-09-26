import AuthLayout from "../../../shared/Layout/AuthLayout";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import BlockedAccountPage from "../../Blocked/Pages/BlockedAccountPage";

export const authRoutes = {
  path: "/auth",
  element: <AuthLayout />,
  children: [
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
    {
      path: "forgot-password",
      element: <ForgotPasswordPage />,
    },
    {
      path: "reset-password/:token",
      element: <ResetPasswordPage />,
    },

  ],
};