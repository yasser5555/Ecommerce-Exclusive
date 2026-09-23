import React, { useEffect } from "react";
import ProductCard from "../../Products/component/Product-card";
import { ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useHomeStore } from "../Store/Home.store";

export default function RecentlyAdded() {
  const {
    RecentySection,
    fetchRecentlySection,
  } = useHomeStore();

  useEffect(() => {
    const getRecentlyAdded = async () => {
      try {
        await fetchRecentlySection();
      } catch (error) {
        console.error(
          `Error at Recently Added: ${error.message}`
        );
      }
    };

    getRecentlyAdded();
  }, [fetchRecentlySection]);

  return (
    <section className="container py-5">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
        <div>
          <span className="text-danger fw-bold">
            Fresh From The Store
          </span>

          <h2 className="fw-bold mt-2 mb-2">
            Recently Added
          </h2>

          <p className="text-secondary mb-0">
            Take a look at some of the latest products in our store.
          </p>
        </div>

        <NavLink
          to="/products"
          className="text-danger text-decoration-none fw-semibold"
        >
          View All
          <ArrowRight size={17} className="ms-1" />
        </NavLink>
      </div>

      <div className="row g-4">
        {RecentySection
          .filter(Boolean)
          .map((product) => (
            <div
              key={product.p_id}
              className="col-12 col-sm-6 col-lg-3"
            >
              <ProductCard
                product={product}
                isactive={0}
                callback={() => {}}
              />
            </div>
          ))}
      </div>
    </section>
  );
}