import { ArrowRight } from "lucide-react";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useHomeStore } from "../Store/Home.store";

export default function FEATURED() {
  const { FeaturedSection, fetchFeaturedSection } = useHomeStore();

  useEffect(() => {
    const getFeatured = async () => {
      try {
        await fetchFeaturedSection();
      } catch (error) {
        console.error(`Error at Featured Section: ${error.message}`);
      }
    };

    getFeatured();
  }, [fetchFeaturedSection]);

  const featuredProduct = FeaturedSection?.[0];

  if (!featuredProduct) {
    return null;
  }

  return (
    <section className="container py-5">
      <div className="bg-dark text-white rounded-4 overflow-hidden shadow-sm">
        <div className="row align-items-stretch g-0">

          {/* Content */}
          <div className="col-lg-6">
            <div className="h-100 d-flex flex-column justify-content-center p-4 p-md-5">

              <span className="badge bg-danger rounded-pill px-3 py-2 mb-4 align-self-start">
                Featured Product
              </span>

              <h2 className="fw-bold fs-5 mb-3">
                {featuredProduct.name}
              </h2>

              <p className="text-white-50 fs-5 mb-4">
                Discover this featured product and explore more products
                from our collection.
              </p>

              <div>
                <NavLink
                  to={`/products/${featuredProduct.p_id}`}
                  className="btn btn-light rounded-3 px-4 py-2 fw-semibold"
                >
                  Explore Product
                  <ArrowRight size={17} className="ms-2" />
                </NavLink>
              </div>

            </div>
          </div>

          {/* Image */}
          <div className="col-lg-6">
            <div
              className="bg-light d-flex align-items-center justify-content-center p-4 p-md-5"
              style={{ minHeight: "400px" }}
            >
              <img
                src={featuredProduct.image}
                alt={featuredProduct.name}
                className="img-fluid"
                style={{
                  width: "100%",
                  height: "340px",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}