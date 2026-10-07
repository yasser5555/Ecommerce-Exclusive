import { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import "../Styles/login.css";
import { useNavigate } from "react-router-dom";
import { useChangeTitle } from "../../../shared/Utils/useChangeTitle";
import { useAuth } from "../hooks/useAuth";
function LoginPage() {
  useChangeTitle({title:`Login`})
  const navigate = useNavigate();
  const { isAuthenticated, authChecked } = useAuth();
  useEffect(() => {
    if (authChecked && isAuthenticated) {
      navigate("/home", {
        replace: true,
      });
    }
  }, [authChecked, isAuthenticated, navigate]);
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
