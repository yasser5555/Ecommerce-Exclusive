import { useResetPassword } from "../hooks/useResetPassword";

function ResetPasswordForm() {
  const { password, isLoading, error, handlePasswordChange, handleSubmit } =
    useResetPassword();

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5">
        <input
          type="password"
          placeholder="New Password"
          className="exclusive-input"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>

      {error && <div className="alert alert-danger mb-3">{error}</div>}

      <button type="submit" disabled={isLoading} className="create-btn w-100">
        {isLoading ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
}

export default ResetPasswordForm;
