import { useChangeTitle } from "../../../shared/Utils/useChangeTitle";
import ResetPasswordForm from "../components/ResetPasswordForm";

function ResetPasswordPage() {
      useChangeTitle({title:`Reset Password`})
  
  return (
    <>
      <h1 className="register-title">Reset Password</h1>

      <p className="register-subtitle">Enter your new password.</p>

      <ResetPasswordForm />
    </>
  );
}

export default ResetPasswordPage;
