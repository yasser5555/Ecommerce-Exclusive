import { Link } from "react-router-dom";
import { useUserRegister } from "../hooks/useUserRegister";

function RegisterForm() {
  const {
    formData,
    handleChange,
    handleSubmit,
    isLoading,
    error,
  } = useUserRegister();

  return (
    <form onSubmit={handleSubmit}>
      {/* First Name */}
      <div className="my-2">
        <input
          type="text"
          name="first_name"
          placeholder="first_name"
          className="exclusive-input"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
      </div>

      {/* Last Name */}
      <div className="my-2">
        <input
          type="text"
          name="last_name"
          placeholder="last_name"
          className="exclusive-input"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
      </div>

      {/* Gender */}
      <div className="my-1">
        <label className="form-label">Gender</label>

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Unknown</option>
        </select>
      </div>

      {/* Phone */}
      <div className="my-2">
        <input
          type="text"
          name="phone_number"
          placeholder="Phone_number"
          className="exclusive-input"
          value={formData.phone_number}
          onChange={handleChange}
          required
        />
      </div>

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
          placeholder="Password"
          className="exclusive-input"
          value={formData.password}
          onChange={handleChange}
          minLength={6}
          required
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="create-btn w-100"
        disabled={isLoading}
      >
        {isLoading ? "Creating Account..." : "Create Account"}
      </button>

      {/* Error */}
      {error && (
        <div className="alert alert-danger mt-3">
          {error}
        </div>
      )}

      {/* Login */}
      <div className="text-center mt-4">
        <span className="text-muted">
          Already have an account?
        </span>

        <Link
          to="/auth/login"
          className="login-link ms-2"
        >
          Log in
        </Link>
      </div>
    </form>
  );
}

export default RegisterForm;