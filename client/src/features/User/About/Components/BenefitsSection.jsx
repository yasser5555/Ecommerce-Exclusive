import { Headphones, ShieldCheck, Truck } from "lucide-react";
import React from "react";

export default function BenefitsSection() {
  return (
    <>
      <section className="py-5 bg-white">
        <div className="container py-lg-4">
          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="text-center p-4">
                <div className="bg-dark text-white rounded-circle d-inline-flex p-3 mb-3">
                  <Truck size={28} />
                </div>
                <h5 className="fw-bold">FREE AND FAST DELIVERY</h5>
                <p className="text-secondary mb-0">
                  Free delivery for all orders over $140
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="text-center p-4">
                <div className="bg-dark text-white rounded-circle d-inline-flex p-3 mb-3">
                  <Headphones size={28} />
                </div>
                <h5 className="fw-bold">24/7 CUSTOMER SERVICE</h5>
                <p className="text-secondary mb-0">
                  Friendly support available whenever you need it
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="text-center p-4">
                <div className="bg-dark text-white rounded-circle d-inline-flex p-3 mb-3">
                  <ShieldCheck size={28} />
                </div>
                <h5 className="fw-bold">MONEY BACK GUARANTEE</h5>
                <p className="text-secondary mb-0">
                  We return your money within 30 days
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
