import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { toast } from "react-toastify";

export const useUserRegister = () => {
  const navigate = useNavigate();

  const { register, isLoading, error } = useAuth();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    phone_number: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await register(formData);
      toast.success(`Welcome ${response.user.first_name}! 🎉`);
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(
        err.response?.data.message || "Registration failed"
      );
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isLoading,
    error,
  };
};