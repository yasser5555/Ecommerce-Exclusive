import ForgotPasswordForm from "../components/ForgotPasswordForm";

function ForgotPasswordPage() {
  return (
    <>
      <h1 className="register-title">Forgot Password</h1>

      <p className="register-subtitle">
        Enter your email address and we'll send you a reset link.
      </p>

      <ForgotPasswordForm />
    </>
  );
}

export default ForgotPasswordPage;
