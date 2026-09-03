import RegisterForm from "../components/RegisterForm";
import "../Styles/register.css";

function RegisterPage() {
  return (
    <div className="register-page">
      <div className="register-wrapper animate-register">
        <h1 className="register-title">
          Create an account
        </h1>

        <p className="register-subtitle">
          Enter your details below
        </p>

        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;