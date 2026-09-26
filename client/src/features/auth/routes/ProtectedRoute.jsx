import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  // This reads the current auth state to decide whether a user may enter the app.
  const { token, isLoading, user, logout } = useAuth();
  const isAdminUser = String(user?.role || "").toLowerCase() === "admin";

  // This shows a loading screen while the auth store is still hydrating.
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  // This redirects users without a token back to the login page.
  if (!token) {
    try {
      // This warns the user that a login is required before viewing the page.
      toast.error("please Login to access page");
    } catch (error) {
      // This catches any toast error silently to prevent a crash.
      console.error(`error at ProtectedRoute.toast ${error}`);
    }
    return <Navigate to="/auth/login" replace />;
  }

  // This blocks the app for accounts with a blocked status from the backend.
  if (String(user?.status || "").toLowerCase() === "blocked") {
    try {
      // This clears the blocked session immediately to stop repeated access attempts.
      logout();
      // This shows a custom message to the user before redirecting.
      toast.error("This account is blocked. Please contact support.", {
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
      });
    } catch (error) {
      // This catches any unexpected logout issue.
      console.error(`error at ProtectedRoute.blockedUser ${error}`);
    }
    return <Navigate to="/auth/blocked" replace />;
  }

  // This protects admin-only routes by returning a boolean state from the user role.
  if (requireAdmin && !isAdminUser) {
    try {
      logout();
      toast.error("not authorized for this access");
    } catch (error) {
      console.error(`error at ProtectedRoute.requireAdmin ${error}`);
    }

    return <Navigate to="/auth/login" replace />;
  }

  // This allows the application to continue for active users.
  return children;
}
