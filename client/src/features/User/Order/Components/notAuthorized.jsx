import React from "react";
export default function NotAuthorized() {
  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
  
      <div
        className="card border-0 shadow-sm text-center"
        style={{ maxWidth: "500px" }}
      >
    
        <div className="card-body p-5">
      
          <div
            className="bg-danger bg-opacity-10 text-danger rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
            style={{ width: "90px", height: "90px" }}
          >
        
            <i className="bi bi-shield-lock-fill fs-1"></i>{" "}
          </div>{" "}
          <h1 className="fw-bold text-danger mb-2">403</h1>{" "}
          <h3 className="fw-semibold mb-3"> Access Denied </h3>{" "}
          <p className="text-secondary mb-4">
        
            You are not authorized to access this page. Please contact the
            administrator if you believe this is a mistake.{" "}
          </p>{" "}
          <button
            className="btn btn-danger px-4 py-2 fw-semibold"
            onClick={() => window.history.back()}
          >
        
            <i className="bi bi-arrow-left me-2"></i> Go Back{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
