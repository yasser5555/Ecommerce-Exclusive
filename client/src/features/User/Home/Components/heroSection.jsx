import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useProfile } from "./../../../Profile/Hooks/useProfile";
import { useHomeStore } from "../Store/Home.store";

export default function HeroSection() {
  const greetings = [
    "What's on your mind today?",
    "What are you looking for today?",
    "What would you like to explore today?",
    "Ready to find something you love?",
    "What can we help you discover today?",
    "Looking for something special?",
    "What are you shopping for today?",
    "Anything you're looking for today?",
    "What's on your wishlist today?",
    "Ready to discover something new?",
    "What catches your eye today?",
    "What would you like to find today?",
    "Looking for your next favorite product?",
    "What do you feel like shopping for?",
    "What are you in the mood for today?",
    "Need something new today?",
    "What should we find for you today?",
    "Ready to upgrade your setup?",
    "Looking for something cool today?",
    "What's your next purchase?",
    "What are you thinking about buying today?",
    "Want to discover something interesting?",
    "What can we find for you today?",
    "Ready for a little shopping?",
    "What's calling your attention today?",
    "What would make your day better?",
    "Looking for something you can't resist?",
    "What's on your shopping list today?",
    "Ready to find something amazing?",
    "What do you want to discover today?",
  ];

  const { profile } = useProfile();

  const [greeting] = useState(
    greetings[Math.floor(Math.random() * greetings.length)]
  );

  const userName = profile?.first_name || "there";

  const {
    heroSection,
    fetchHeroSection,
    isLoading,
    error,
  } = useHomeStore();

  useEffect(() => {
    const getData = async () => {
      try {
        await fetchHeroSection();
      } catch (error) {
        console.error(`Error at Hero Section: ${error.message}`);
      }
    };

    getData();
  }, [fetchHeroSection]);

  return (
    <section className="container py-4 py-md-5">
      {/* Greeting */}
      <div className="mb-4">
        <p className="text-secondary mb-2 fw-medium">
          Welcome, {userName} 👋
        </p>

        <h1 className="fw-bold display-6 mb-0">
          {greeting}
        </h1>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="bg-dark text-white rounded-4 shadow-sm p-5 text-center">
          <div
            className="spinner-border text-light mb-3"
            role="status"
          >
            <span className="visually-hidden">
              Loading...
            </span>
          </div>

          <p className="text-white-50 mb-0">
            Discovering products for you...
          </p>
        </div>
      )}

      {/* Error */}
      {!isLoading && error && (
        <div className="bg-dark text-white rounded-4 shadow-sm p-5 text-center">
          <h4 className="fw-bold mb-2">
            Something went wrong
          </h4>

          <p className="text-white-50 mb-0">
            We couldn't load the hero products.
          </p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && heroSection.length === 0 && (
        <div className="bg-dark text-white rounded-4 shadow-sm p-5 text-center">
          <h4 className="fw-bold mb-2">
            No products available
          </h4>

          <p className="text-white-50 mb-0">
            Please try again later.
          </p>
        </div>
      )}

      {/* Hero Carousel */}
      {!isLoading && !error && heroSection.length > 0 && (
        <div
          id="heroCarousel"
          
          className="carousel slide overflow-hidden rounded-4 shadow-sm"
          data-bs-ride="carousel"
          data-bs-interval="3000"
        >
          {/* Indicators */}
          <div className="carousel-indicators  mb-3">
            {heroSection.map((product, index) => (
              <button
                key={product.p_id}
                type="button"
                
                data-bs-target="#heroCarousel"
                data-bs-slide-to={index}
                className={`bg-black ${index === 0 ? "active" : ""}`}
                aria-current={
                  index === 0 ? "true" : undefined
                }
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Slides */}
          <div className="carousel-inner">
            {heroSection.map((product, index) => (
              <div
                key={product.p_id}
                className={`carousel-item ${
                  index === 0 ? "active" : ""
                }`}
              >
                <div className="bg-light-subtle text-white">
                  <div className="container py-5 px-4 px-md-5">
                    <div className="row align-items-center g-4">
                      {/* Product Information */}
                      <div className="col-lg-6 py-3 py-lg-5">
                        <span className="badge bg-danger rounded-pill px-3 py-2 mb-4">
                          {product.category}
                        </span>

                        <h6 className="fs-5 text-black fw-bold lh-sm mb-3">
                          Discover
                          <br />
                          {product.name}
                        </h6>

                        <p className="text-black fs-5 mb-4">
                          Explore this product and discover more
                          from our collection.
                        </p>

                        <NavLink
                          to={`/products/${product.p_id}`}
                          className="btn btn-outline-danger btn-lg rounded-pill px-4 fw-semibold"
                        >
                          View Product
                          <span className="ms-2">
                            →
                          </span>
                        </NavLink>
                      </div>

                      {/* Product Image */}
                      <div className="col-lg-6 text-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="img-fluid object-fit-cover"
                          style={{
                            maxHeight: "360px",
                            maxWidth: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
       
        </div>
      )}
    </section>
  );
}