import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  return children;
}
