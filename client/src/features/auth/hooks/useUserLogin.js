import { useNavigate } from "react-router-dom";
import { useAuth } from './useAuth';
import { useState } from "react";
import { toast } from "react-toastify";

export const useUserLogin = () => {
  const navigate = useNavigate();

  const { login, isLoading, error } = useAuth();

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
    let response = null;
    try {
      response = await login(formData, rememberMe);
      toast.success(`Welcome back ${response.user.email}!`);
      console.log(response);
      navigate("/profile", {
        replace: true,
      });
    } catch (error) {
          toast.error(`Error: ${response.error}!`);
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
