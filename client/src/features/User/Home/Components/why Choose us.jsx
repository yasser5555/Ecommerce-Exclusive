import { Headset, RotateCcw, ShieldCheck, Truck } from 'lucide-react'
import React from 'react'

export default function WhyChooseUs() {
  return (
    <>
          {/* =====================================================
          WHY CHOOSE US
      ====================================================== */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <span className="text-danger fw-bold">
            Why Exclusive?
          </span>
          <h2 className="fw-bold mt-2">
            Shopping Made Simple
          </h2>
          <p className="text-secondary">
            Everything you need for a smooth shopping experience.
          </p>

        </div>

        <div className="row g-4">

          <div className="col-12 col-md-6 col-lg-3">
            <div className="text-center p-4">

              <div className="bg-dark text-white rounded-circle d-inline-flex p-3 mb-3">
                <Truck size={25} />
              </div>

              <h5 className="fw-bold">
                Fast Delivery
              </h5>

              <p className="text-secondary mb-0">
                Fast and reliable delivery for your orders.
              </p>

            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <div className="text-center p-4">

              <div className="bg-dark text-white rounded-circle d-inline-flex p-3 mb-3">
                <Headset size={25} />
              </div>

              <h5 className="fw-bold">
                24/7 Support
              </h5>

              <p className="text-secondary mb-0">
                Our support team is here whenever you need help.
              </p>

            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <div className="text-center p-4">

              <div className="bg-dark text-white rounded-circle d-inline-flex p-3 mb-3">
                <ShieldCheck size={25} />
              </div>

              <h5 className="fw-bold">
                Secure Payment
              </h5>

              <p className="text-secondary mb-0">
                Your payment information is handled securely.
              </p>

            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <div className="text-center p-4">

              <div className="bg-dark text-white rounded-circle d-inline-flex p-3 mb-3">
                <RotateCcw size={25} />
              </div>

              <h5 className="fw-bold">
                Easy Returns
              </h5>

              <p className="text-secondary mb-0">
                Simple return process for eligible products.
              </p>

            </div>
          </div>

        </div>

      </section></>
  )
}
