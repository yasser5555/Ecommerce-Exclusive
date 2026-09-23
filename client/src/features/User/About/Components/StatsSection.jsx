import { Package, ShoppingCart, Star, Truck } from "lucide-react";
import React from "react";

export default function StatsSection() {
  return (
    <>
      {/* Stats */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row g-4">
            <div className="col-6 col-lg-3">
              <div className="text-center p-4 rounded-4 border h-100">
                <div className="bg-danger-subtle text-danger rounded-circle d-inline-flex p-3 mb-3">
                  <ShoppingCart size={26} />
                </div>

                <h2 className="fw-bold mb-1">10K+</h2>
                <p className="text-secondary mb-0">Products</p>
              </div>
            </div>

            <div className="col-6 col-lg-3">
              <div className="text-center p-4 rounded-4 border h-100">
                <div className="bg-danger-subtle text-danger rounded-circle d-inline-flex p-3 mb-3">
                  <Package size={26} />
                </div>

                <h2 className="fw-bold mb-1">5K+</h2>
                <p className="text-secondary mb-0">Happy Customers</p>
              </div>
            </div>

            <div className="col-6 col-lg-3">
              <div className="text-center p-4 rounded-4 border h-100">
                <div className="bg-danger-subtle text-danger rounded-circle d-inline-flex p-3 mb-3">
                  <Star size={26} />
                </div>

                <h2 className="fw-bold mb-1">4.8</h2>
                <p className="text-secondary mb-0">Average Rating</p>
              </div>
            </div>

            <div className="col-6 col-lg-3">
              <div className="text-center p-4 rounded-4 border h-100">
                <div className="bg-danger-subtle text-danger rounded-circle d-inline-flex p-3 mb-3">
                  <Truck size={26} />
                </div>

                <h2 className="fw-bold mb-1">24/7</h2>
                <p className="text-secondary mb-0">Fast Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
