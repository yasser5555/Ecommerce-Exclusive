import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./useAuth";
import { useState } from "react";
import { toast } from "react-toastify";

export const useResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const { resetPassword, isLoading, error } = useAuth();

  const [password, setPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await resetPassword(token, password);
      toast.success("Password updated successfully ✅");
      navigate("/auth/login", {
        replace: true,
      });
    } catch (err) {
      console.log("RESET PASSWORD ERROR:", err);

      toast.error(
        err?.response?.data?.message || "Failed to update password"
      );
    }
  };

  return {
    password,
    isLoading,
    error,
    handlePasswordChange,
    handleSubmit,
  };
};