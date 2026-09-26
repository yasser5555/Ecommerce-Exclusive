import { useNavigate } from "react-router-dom";
import { useAuth } from './useAuth';
import { useState } from "react";
import { toast } from "react-toastify";

export const useUserLogin = () => {
  const navigate = useNavigate();

  const { login, logout, isLoading, error } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // This sends the login request to the backend and waits for the server response.
      const response = await login(formData, rememberMe);
      // This checks the returned user record for a blocked account before redirecting.
      if (String(response?.user?.status || "").toLowerCase() === "blocked") {
        // This clears the current session immediately to prevent access.
        logout();
        // This shows a custom blocked-account toast to explain the restriction.
        toast.error("Your account is blocked. Please contact support to regain access.", {
          position: "top-center",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
        // This redirects the blocked user to the dedicated blocked page.
        navigate("/blocked", { replace: true });
        return;
      }
      // This shows a welcome message when the user is active and allowed to log in.
      toast.success(`Welcome back ${response.user.email}!`);
      // This takes approved users to their profile page.
      navigate("/profile", {
        replace: true,
      });
    } catch (error) {
      // This catches a failed login and displays the API error message.
      toast.error(`Error: ${error?.response?.data?.message || error?.message || "Login failed"}`);
    }
  };

  return {
    formData,
    rememberMe,
    isLoading,
    error,
    handleChange,
    handleRememberMe,
    handleSubmit,
  };
};
