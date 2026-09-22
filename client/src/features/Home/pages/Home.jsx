import React from "react";
import { NavLink } from "react-router-dom";
import { Search, ShoppingBag, Truck, ArrowRight } from "lucide-react";

import { useChangeTitle } from "../../../shared/Utils/useChangeTitle";
import HeroSection from "../Components/heroSection";
import WhyChooseUs from "../Components/why Choose us";
import RecentlyAdded from "../Components/Recently Added";
import QuickCatogeries from "../Components/quick Catogeries";
import SHOPPINGEXPERIENCE from "../Components/SHOPPING EXPERIENCE";
import TRENDINGNOW from "../Components/TRENDING NOW";
import FEATURED from "../Components/FEATURED";

function Homepage() {
  useChangeTitle({ title: "Home" });

  return (
    <main className="bg-white">
      {/* =====================================================
          HERO
      ====================================================== */}

      <HeroSection />

      {/* =====================================================
          QUICK CATEGORIES
      ====================================================== */}
      <QuickCatogeries />

      {/* =====================================================
          TRENDING NOW
      ====================================================== */}

      <TRENDINGNOW  />

      {/* =====================================================
          SHOPPING EXPERIENCE
      ====================================================== */}

      <SHOPPINGEXPERIENCE />

      {/* =====================================================
          FEATURED COLLECTION
      ====================================================== */}
      <FEATURED />

      {/* =====================================================
          RECENTLY ADDED
      ====================================================== */}
      <RecentlyAdded recentlyAddedProducts={[]} />

      {/* =====================================================
          YOUR SHOPPING JOURNEY
      ====================================================== */}

      <section className="container py-5">
        <div className="text-center mb-5">
          <span className="text-danger fw-bold">How It Works</span>

          <h2 className="fw-bold mt-2 mb-2">Your Shopping Journey</h2>

          <p className="text-secondary mb-0">
            From discovering a product to receiving your order, everything is
            simple.
          </p>
        </div>

        <div className="row g-4 align-items-stretch">
          <div className="col-md-4">
            <div className="border rounded-4 p-4 h-100 text-center position-relative">
              <div
                className="bg-dark text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                style={{ width: "64px", height: "64px" }}
              >
                <Search size={27} />
              </div>

              <span className="d-block text-danger fw-bold small mb-2">
                STEP 01
              </span>

              <h5 className="fw-bold">Discover</h5>

              <p className="text-secondary mb-0">
                Browse categories and search through our collection to find
                products you like.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="border rounded-4 p-4 h-100 text-center position-relative">
              <div
                className="bg-dark text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                style={{ width: "64px", height: "64px" }}
              >
                <ShoppingBag size={27} />
              </div>

              <span className="d-block text-danger fw-bold small mb-2">
                STEP 02
              </span>

              <h5 className="fw-bold">Choose</h5>

              <p className="text-secondary mb-0">
                Add your favorite products to the cart and choose your preferred
                checkout options.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="border rounded-4 p-4 h-100 text-center">
              <div
                className="bg-dark text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                style={{ width: "64px", height: "64px" }}
              >
                <Truck size={27} />
              </div>

              <span className="d-block text-danger fw-bold small mb-2">
                STEP 03
              </span>

              <h5 className="fw-bold">Receive</h5>

              <p className="text-secondary mb-0">
                Place your order, follow its status and receive it at your
                selected address.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY CHOOSE US
      ====================================================== */}

      <WhyChooseUs />

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="container py-5">
        <div className="bg-danger text-white rounded-4 p-4 p-md-5 text-center">
          <h2 className="fw-bold mb-3">Ready to find something you love?</h2>

          <p className="mb-4 text-white-50 fs-5">
            Explore our collection and discover your next favorite product.
          </p>

          <NavLink
            to="/products"
            className="btn btn-light rounded-3 px-5 py-2 fw-semibold"
          >
            Start Shopping
            <ArrowRight size={17} className="ms-2" />
          </NavLink>
        </div>
      </section>
    </main>
  );
}

export default Homepage;
