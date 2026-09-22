import React, { useEffect } from "react";
import ProductCard from "../../Products/component/Product-card";
import { NavLink } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useHomeStore } from "../Store/Home.store";

export default function TRENDINGNOW() {
   const {
       TrendingSection,
       fetchTrendingSection,
       isLoading,
       error,
     } = useHomeStore();
   
     useEffect(() => {
       const getData = async () => {
         try {
           await fetchTrendingSection();
         } catch (error) {
           console.error(`Error at Hero Section: ${error.message}`);
         }
       };
   
       getData();
     }, [fetchTrendingSection]);

  return (
    <section className="container py-5">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
        <div>
          <span className="text-danger fw-bold">
            Popular Right Now
          </span>

          <h2 className="fw-bold mt-2 mb-2">
            Trending Now
          </h2>

          <p className="text-secondary mb-0">
            Discover products worth taking a closer look at.
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
        {TrendingSection.map((product) => (
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