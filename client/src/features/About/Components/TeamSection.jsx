import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

export default function TeamSection() {
  return (
    <>
      {/* Team */}
      <section className="py-5">
        <div className="container py-lg-4">
          <div className="text-center mb-5">
            <span className="badge bg-danger-subtle text-danger rounded-pill px-3 py-2 mb-3">
              OUR TEAM
            </span>

            <h2 className="display-6 fw-bold mb-3">
              Meet the people behind Exclusive
            </h2>

            <p className="text-secondary mx-auto" style={{ maxWidth: "650px" }}>
              A small team with a big passion for creating a better shopping
              experience.
            </p>
          </div>

          <div className="row g-4">
            {[
              {
                name: "Ahmed Hassan",
                role: "Founder & CEO",
              },
              {
                name: "Sarah Mohamed",
                role: "Product Manager",
              },
              {
                name: "Omar Ali",
                role: "Technology Lead",
              },
            ].map((member) => (
              <div className="col-12 col-md-4" key={member.name}>
                <div className="bg-white rounded-4 overflow-hidden shadow-sm h-100">
                  <img
                    src={`https://placehold.co/600x600/f1f5f9/64748b?text=${encodeURIComponent(
                      member.name,
                    )}`}
                    alt={member.name}
                    className="img-fluid w-100"
                  />

                  <div className="p-4 text-center">
                    <h5 className="fw-bold mb-1">{member.name}</h5>

                    <p className="text-danger mb-0">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
            <button className="btn btn-outline-secondary rounded-circle p-2">
              <ChevronLeft size={20} />
            </button>

            <div className="d-flex gap-2">
              <span
                className="bg-danger rounded-circle"
                style={{ width: "8px", height: "8px" }}
              />

              <span
                className="bg-secondary-subtle rounded-circle"
                style={{ width: "8px", height: "8px" }}
              />

              <span
                className="bg-secondary-subtle rounded-circle"
                style={{ width: "8px", height: "8px" }}
              />
            </div>

            <button className="btn btn-outline-secondary rounded-circle p-2">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
