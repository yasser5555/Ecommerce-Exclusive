import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useProducts } from "./../../Products/hooks/useProductStore";

export default function HeroSection() {
 

  
  return (
    <section className="bg-dark text-white">
      <div
        id="heroCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="5000"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>

          <button
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>

          <button
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>

        <div className="carousel-inner">
          {/* ===================== SLIDE 1 ===================== */}
          <div className="carousel-item active">
            <div className="container py-5">
              <div className="row align-items-center min-vh-50">
                <div className="col-md-6 py-5">
                  <p className="mb-3">
                    <i className="bi bi-apple me-2"></i>
                    iPhone 14 Series
                  </p>

                  <h1 className="display-4 fw-bold lh-sm">
                    Up to 10% <br />
                    off Voucher
                  </h1>

                  <NavLink
                    to="/products"
                    className="text-white text-decoration-underline mt-3 d-inline-block"
                  >
                    Shop Now <span className="ms-2">→</span>
                  </NavLink>
                </div>

                <div className="col-md-6 text-center">
                  <img
                    src="https://placehold.co/600x420/222222/ffffff?text=iPhone+14"
                    alt="iPhone 14 Series"
                    className="img-fluid"
                    style={{ maxHeight: "380px", objectFit: "contain" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ===================== SLIDE 2 ===================== */}
          <div className="carousel-item">
            <div className="container py-5">
              <div className="row align-items-center min-vh-50">
                <div className="col-md-6 py-5">
                  <p className="mb-3">
                    <i className="bi bi-laptop me-2"></i>
                    Gaming Collection
                  </p>

                  <h1 className="display-4 fw-bold lh-sm">
                    Level Up <br />
                    Your Setup
                  </h1>

                  <NavLink
                    to="/products"
                    className="text-white text-decoration-underline mt-3 d-inline-block"
                  >
                    Explore Now <span className="ms-2">→</span>
                  </NavLink>
                </div>

                <div className="col-md-6 text-center">
                  <img
                    src="https://placehold.co/600x420/222222/ffffff?text=Gaming+Setup"
                    alt="Gaming Collection"
                    className="img-fluid"
                    style={{ maxHeight: "380px", objectFit: "contain" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ===================== SLIDE 3 ===================== */}
          <div className="carousel-item">
            <div className="container py-5">
              <div className="row align-items-center min-vh-50">
                <div className="col-md-6 py-5">
                  <p className="mb-3">
                    <i className="bi bi-headphones me-2"></i>
                    Accessories
                  </p>

                  <h1 className="display-4 fw-bold lh-sm">
                    Upgrade <br />
                    Your Gear
                  </h1>

                  <NavLink
                    to="/products"
                    className="text-white text-decoration-underline mt-3 d-inline-block"
                  >
                    Shop Accessories <span className="ms-2">→</span>
                  </NavLink>
                </div>

                <div className="col-md-6 text-center">
                  <img
                    src="https://placehold.co/600x420/222222/ffffff?text=Accessories"
                    alt="Accessories"
                    className="img-fluid"
                    style={{ maxHeight: "380px", objectFit: "contain" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================== PREVIOUS ===================== */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        {/* ===================== NEXT ===================== */}
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
}
