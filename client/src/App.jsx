import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { router } from "./routes";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useAuthStore } from "./features/auth/store/auth.store";

function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("auth-storage");
    initializeAuth().catch((error) => {
      console.error("Failed to restore the authentication session", error);
    });
  }, [initializeAuth]);

  return (
    <>
      <RouterProvider router={router} />

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme="colored"
      />
    </>
  );
}

export default App;