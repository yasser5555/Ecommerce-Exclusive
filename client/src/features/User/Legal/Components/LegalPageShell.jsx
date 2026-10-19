import React from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function LegalPageShell({ eyebrow, title, description, children }) {
  return (
    <main className="bg-light">
      <section className="container py-5">
        <NavLink
          to="/home"
          className="small fw-semibold text-decoration-none text-secondary d-inline-flex align-items-center gap-2 mb-4"
        >
          <ArrowLeft size={16} />
          Back to shopping
        </NavLink>

        <header className="bg-dark text-white rounded-4 p-4 p-md-5 mb-4 overflow-hidden position-relative">
          <div className="position-relative" style={{ zIndex: 1 }}>
            <span className="badge rounded-pill bg-danger px-3 py-2 mb-3">
              <ShieldCheck size={14} className="me-2" />
              {eyebrow}
            </span>
            <h1 className="display-5 fw-bold mb-3">{title}</h1>
            <p className="text-white-50 fs-5 mb-0" style={{ maxWidth: "700px" }}>
              {description}
            </p>
          </div>
          <div
            aria-hidden="true"
            className="position-absolute rounded-circle border border-secondary opacity-25"
            style={{ width: 280, height: 280, right: -80, top: -140 }}
          />
          <div
            aria-hidden="true"
            className="position-absolute rounded-circle border border-danger opacity-25"
            style={{ width: 190, height: 190, right: 60, bottom: -140 }}
          />
        </header>

        <div className="bg-white border rounded-4 shadow-sm p-4 p-md-5">
          {children}
        </div>
      </section>
    </main>
  );
}
