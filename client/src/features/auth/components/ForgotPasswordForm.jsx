import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";

function ForgotPasswordForm() {
  const {
    forgotPassword,
    isLoading,
  } = useAuth();

  const [email, setEmail] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await forgotPassword(email);

      toast.success(
        "Password reset email sent 📩"
      );
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5">
        <input
          type="email"
          placeholder="Enter your email"
          className="exclusive-input"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />
      </div>

      <button
        type="submit"
        className="create-btn w-100"
        disabled={isLoading}
      >
        {isLoading
          ? "Sending..."
          : "Send Reset Link"}
      </button>
    </form>
  );
}

export default ForgotPasswordForm;