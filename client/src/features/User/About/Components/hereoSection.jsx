import React from "react";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function HereoSection() {
  const Navigate = useNavigate();
  return (
    <>
      {/* Hero / Story Section */}
      <section className="py-5">
        <div className="container py-lg-5">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6">
              <span className="badge bg-danger-subtle text-danger rounded-pill px-3 py-2 mb-3">
                OUR STORY
              </span>

              <h1 className="display-4 fw-bold mb-4">
                We make shopping
                <span className="text-danger"> simple.</span>
              </h1>

              <p className="text-secondary fs-5 lh-lg mb-4">
                Welcome to Exclusive, your trusted destination for quality
                products and an enjoyable online shopping experience. We believe
                shopping should be simple, fast, and reliable.
              </p>

              <p className="text-secondary lh-lg mb-4">
                Our goal is to connect customers with products they love while
                providing a smooth experience from discovering a product to
                receiving it at their doorstep.
              </p>

              <button onClick={()=>Navigate("/products/")} className="btn btn-danger px-4 py-3 rounded-3 fw-semibold">
                Explore Products
                <ArrowRight size={18} className="ms-2" />
              </button>
            </div>

            <div className="col-12 col-lg-6">
              <div className="position-relative">
                <img
                  src="https://placehold.co/900x600/f1f5f9/64748b?text=Our+Story"
                  alt="Our Story"
                  className="img-fluid w-100 rounded-4 shadow"
                />

                <div
                  className="position-absolute bg-white rounded-4 shadow p-3 p-md-4"
                  style={{
                    bottom: "-25px",
                    left: "20px",
                    maxWidth: "260px",
                  }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-danger-subtle text-danger rounded-3 p-2">
                      <ShoppingCart size={24} />
                    </div>

                    <div>
                      <h6 className="fw-bold mb-1">Quality First</h6>
                      <small className="text-secondary">
                        Products you can trust
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
