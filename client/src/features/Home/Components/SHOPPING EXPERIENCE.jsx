import { Search, ShoppingBag, Truck } from "lucide-react";
import React from "react";

export default function SHOPPINGEXPERIENCE() {
  return (
    <>
      <section className="container py-5">
        <div className="bg-light rounded-4 p-4 p-md-5">
          <div className="text-center mb-5">
            <span className="text-danger fw-bold">Simple & Convenient</span>

            <h2 className="fw-bold mt-2 mb-2">A Better Way to Shop</h2>

            <p className="text-secondary mb-0">
              Everything is designed to make your shopping experience simple and
              convenient.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="bg-white rounded-4 p-4 h-100 text-center shadow-sm">
                <div
                  className="bg-danger-subtle rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                  style={{ width: "70px", height: "70px" }}
                >
                  <Search size={30} className="text-danger" />
                </div>

                <h5 className="fw-bold">Find What You Need</h5>

                <p className="text-secondary mb-0">
                  Search and explore a wide range of products from different
                  categories.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="bg-white rounded-4 p-4 h-100 text-center shadow-sm">
                <div
                  className="bg-danger-subtle rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                  style={{ width: "70px", height: "70px" }}
                >
                  <ShoppingBag size={30} className="text-danger" />
                </div>

                <h5 className="fw-bold">Shop With Ease</h5>

                <p className="text-secondary mb-0">
                  Add your favorite products to the cart and complete your order
                  easily.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="bg-white rounded-4 p-4 h-100 text-center shadow-sm">
                <div
                  className="bg-danger-subtle rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                  style={{ width: "70px", height: "70px" }}
                >
                  <Truck size={30} className="text-danger" />
                </div>

                <h5 className="fw-bold">Receive Your Order</h5>

                <p className="text-secondary mb-0">
                  Track your order and receive it at your selected delivery
                  address.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
