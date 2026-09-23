import {
  Camera,
  Gamepad2,
  Headphones,
  Monitor,
  Shirt,
  Smartphone,
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";
import { useHomeStore } from "../Store/Home.store";

export default function QuickCatogeries() {
  const { CatogeriesSection } = useHomeStore();

  const categoryIcons = {
    Smartphones: Smartphone,
    Computers: Monitor,
    Audio: Headphones,
    Gaming: Gamepad2,
    Fashion: Shirt,
    Cameras: Camera,
  };

  return (
    <section className="container py-5">
      <div className="text-center mb-5">
        <span className="text-danger fw-bold">Explore</span>

        <h2 className="fw-bold mt-2 mb-2">
          What are you looking for?
        </h2>

        <p className="text-secondary mb-0">
          Browse our store by category and find what you need faster.
        </p>
      </div>

      <div className="row g-3">
        {CatogeriesSection.map((category) => {
          const Icon = categoryIcons[category.name] || Smartphone;

          return (
            <div
              key={category.id}
              className="col-6 col-md-4 col-lg-2"
            >
              <NavLink
                to={`/products?category=${category.name.toLowerCase()}`}
                className="text-decoration-none"
              >
                <div className="border rounded-4 p-4 text-center h-100 bg-white shadow-sm">
                  <Icon
                    size={32}
                    className="text-danger mb-3"
                  />

                  <h6 className="fw-bold text-dark mb-0">
                    {category.name}
                  </h6>
                </div>
              </NavLink>
            </div>
          );
        })}
      </div>
    </section>
  );
}