import { Link } from "react-router-dom";

import { useUserLogin } from "../hooks/useUserLogin";

function LoginForm() {
  const {
    formData,
    rememberMe,
    isLoading,
    error,
    handleChange,
    handleRememberMe,
    handleSubmit,
  } = useUserLogin();

  return (
    <form onSubmit={handleSubmit}>
      {/* Email */}
      <div className="my-2">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="exclusive-input"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      {/* Password */}
      <div className="my-2">
        <input
          type="password"
          name="password"
          placeholder="Enter your Password"
          className="exclusive-input"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* Remember Me */}
        <div className="d-flex gap-3 pt-2 justify-content-start align-items-baseline">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={handleRememberMe}
          />

          <label className="form-label">
            Remember Me
          </label>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="alert alert-danger mt-3">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
        <button
          type="submit"
          className="exclusive-btn"
          disabled={isLoading}
        >
          {isLoading ? "Logging In..." : "Log In"}
        </button>

        <Link
          to="/auth/forgot-password"
          className="forgot-link"
        >
          Forgot Password?
        </Link>

        <Link
          to="/auth/register"
          className="forgot-link"
        >
          Create a new Account
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;