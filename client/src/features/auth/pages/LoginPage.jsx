import { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import "../Styles/login.css";
import { useNavigate } from "react-router-dom";
function LoginPage() {
  document.title = "login"
  const navigate = useNavigate();
  useEffect(() => {
    function CheckToken() {
      if (localStorage.getItem("token")) {
        navigate("/profile", {
          replace: true,
        });
      }
    }
    CheckToken();
  }, []);
  return (
    <div className="login-page">
      <div className="login-wrapper animate-login">
        <h1 className="login-title">Log in to Exclusive</h1>
        <p className="login-subtitle">Enter your details below</p>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
