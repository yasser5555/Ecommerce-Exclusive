import { Outlet } from "react-router-dom";
import authImage from "../Assets/log_and_reg.png";

function AuthLayout() {
  return (
    <div className="container-fluid p-0">
      <div className="row min-vh-100 g-0">
        {/* Left Side Image */}
        <div className="col-lg-7 d-none d-lg-block">
          <img src={authImage} alt="Shopping" className="img-fluid max-height  w-100" />
        </div>

        {/* Right Side Form */}
        <div
          className="
            col-12
            col-lg-5
            d-flex
            justify-content-center
            align-items-center
          "
        >
          <div
            className="w-100 px-4"
            style={{
              maxWidth: "420px",
            }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
