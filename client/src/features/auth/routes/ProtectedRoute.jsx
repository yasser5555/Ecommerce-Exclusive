import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
export default function ProtectedRoute({ children }) {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!token) {
    toast.error(`please Login to access page`)
    return <Navigate to="/auth/login" />;
  }

  return children;
}
