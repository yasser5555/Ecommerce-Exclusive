import React from "react";
import {
  Check,
  Copy,
  Truck,
  Package,
  MapPin,
  CreditCard,
  ChevronRight,
  CircleCheck,
  Clock3,
  MessageCircle,
  XCircle,
} from "lucide-react";

export default function OrderDetails() {
  return (
    <div className="bg-light min-vh-100">

      {/* ================= NAVBAR ================= */}
      <nav className="navbar navbar-expand-lg bg-white border-bottom">
        <div className="container">

          <a className="navbar-brand fw-bold text-danger" href="#">
            Exclusive
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto gap-lg-3">

              <li className="nav-item">
                <a className="nav-link" href="#">
                  Home
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">
                  Shop
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">
                  About
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contact
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">
                  My Account
                </a>
              </li>

            </ul>

            <div className="d-flex align-items-center gap-3">
              <div className="input-group input-group-sm">
                <input
                  type="text"
                  className="form-control"
                  placeholder="What are you looking for?"
                />

                <button className="btn btn-light">
                  🔍
                </button>
              </div>

              <span>♡</span>
              <span>🛒</span>
            </div>
          </div>

        </div>
      </nav>


      {/* ================= PAGE ================= */}
      <div className="container py-4">

        {/* Breadcrumb */}
        <div className="small text-muted mb-4">
          Home
          <ChevronRight size={14} className="mx-1" />
          My Account
          <ChevronRight size={14} className="mx-1" />
          My Orders
          <ChevronRight size={14} className="mx-1" />
          <span className="text-dark">
            Order #12345
          </span>
        </div>


        {/* ================= ORDER HEADER ================= */}
        <div className="bg-white rounded-3 border p-4 mb-4">

          <div className="d-flex flex-column flex-md-row justify-content-between gap-3">

            <div>
              <h5 className="fw-bold mb-2">
                Order #12345
              </h5>

              <p className="text-muted small mb-0">
                Thank you for your purchase! Your order was placed on
                Sep 12, 2026 at 10:42 AM.
              </p>
            </div>

            <div className="d-flex gap-2">

              <button className="btn btn-outline-secondary btn-sm">
                <Copy size={14} className="me-1" />
                Download Invoice
              </button>

              <button className="btn btn-outline-danger btn-sm">
                Need Help?
              </button>

              <button className="btn btn-danger btn-sm">
                Reorder
              </button>

            </div>

          </div>

        </div>


        {/* ================= SHIPPING CARD ================= */}
        <div className="bg-white rounded-3 border p-4 mb-4">

          <div className="d-flex justify-content-between align-items-start mb-4">

            <div className="d-flex gap-3">

              <div className="order-icon">
                <Truck size={22} />
              </div>

              <div>
                <h6 className="fw-bold mb-1">
                  Shipped / In Transit
                </h6>

                <p className="small text-muted mb-1">
                  Courier: Express Delivery
                </p>

                <p className="small text-muted mb-1">
                  Tracking number: EX123456789
                </p>

                <p className="small text-muted mb-0">
                  Estimated delivery: Sep 18, 2026
                </p>
              </div>

            </div>

            <button className="btn btn-light btn-sm">
              EX123456789
              <Copy size={13} className="ms-1" />
            </button>

          </div>


          {/* ================= TRACKING ================= */}
          <div className="tracking-wrapper">

            <div className="tracking-line"></div>

            <div className="tracking-step completed">

              <div className="tracking-circle">
                <Check size={15} />
              </div>

              <small className="fw-semibold">
                Order Placed
              </small>

              <span>
                Sep 12
              </span>

            </div>


            <div className="tracking-step completed">

              <div className="tracking-circle">
                <Check size={15} />
              </div>

              <small className="fw-semibold">
                Shipment Sent
              </small>

              <span>
                Sep 13
              </span>

            </div>


            <div className="tracking-step active">

              <div className="tracking-circle">
                <Truck size={14} />
              </div>

              <small className="fw-semibold">
                In Transit
              </small>

              <span>
                Sep 15
              </span>

            </div>


            <div className="tracking-step">

              <div className="tracking-circle">
                <Package size={14} />
              </div>

              <small>
                Out for Delivery
              </small>

              <span>
                Sep 18
              </span>

            </div>


            <div className="tracking-step">

              <div className="tracking-circle">
                <Check size={14} />
              </div>

              <small>
                Delivered
              </small>

              <span>
                —
              </span>

            </div>

          </div>

        </div>


        {/* ================= ACTIVITY ================= */}
        <div className="bg-white rounded-3 border p-4 mb-4">

          <div className="d-flex justify-content-between mb-3">
            <h6 className="fw-bold mb-0">
              Live Activity
            </h6>

            <small className="text-muted">
              Updated 10 min ago
            </small>
          </div>


          <div className="activity-item">

            <CircleCheck
              size={17}
              className="text-success flex-shrink-0"
            />

            <div>
              <p className="small fw-semibold mb-1">
                Package has arrived at the local sorting facility
              </p>

              <p className="small text-muted mb-0">
                Your package is being prepared for the next delivery
                stage.
              </p>

              <small className="text-muted">
                Today, 09:15 AM
              </small>
            </div>

          </div>


          <div className="activity-item">

            <Truck
              size={17}
              className="text-danger flex-shrink-0"
            />

            <div>
              <p className="small fw-semibold mb-1">
                Package is currently in transit
              </p>

              <p className="small text-muted mb-0">
                The courier has picked up your package.
              </p>

              <small className="text-muted">
                Yesterday, 06:30 PM
              </small>
            </div>

          </div>


          <div className="activity-item">

            <Package
              size={17}
              className="text-secondary flex-shrink-0"
            />

            <div>
              <p className="small fw-semibold mb-1">
                Order has been shipped
              </p>

              <p className="small text-muted mb-0">
                Your order has left the warehouse.
              </p>

              <small className="text-muted">
                Sep 13, 2026
              </small>
            </div>

          </div>

        </div>


        {/* ================= ITEMS ================= */}
        <div className="bg-white rounded-3 border p-4 mb-4">

          <div className="d-flex justify-content-between align-items-center mb-3">

            <h6 className="fw-bold mb-0">
              Items in this Shipment
            </h6>

            <span className="badge bg-light text-dark">
              2 Items
            </span>

          </div>


          {/* ITEM 1 */}
          <div className="product-row">

            <img
              src="https://dummyimage.com/80x80/f5f5f5/555"
              alt="Product"
              className="product-image"
            />

            <div className="flex-grow-1">

              <h6 className="small fw-bold mb-1">
                Wireless Bluetooth Headphones
              </h6>

              <p className="small text-muted mb-1">
                Black / Standard
              </p>

              <p className="small text-muted mb-0">
                Quantity: 1
              </p>

            </div>

            <div className="text-end">

              <p className="small fw-bold mb-1">
                $95.00
              </p>

              <small className="text-success">
                In Transit
              </small>

            </div>

          </div>


          {/* ITEM 2 */}
          <div className="product-row">

            <img
              src="https://dummyimage.com/80x80/f5f5f5/555"
              alt="Product"
              className="product-image"
            />

            <div className="flex-grow-1">

              <h6 className="small fw-bold mb-1">
                Men's Casual Sneakers
              </h6>

              <p className="small text-muted mb-1">
                Black / Size 42
              </p>

              <p className="small text-muted mb-0">
                Quantity: 1
              </p>

            </div>

            <div className="text-end">

              <p className="small fw-bold mb-1">
                $100.00
              </p>

              <small className="text-success">
                In Transit
              </small>

            </div>

          </div>

        </div>


        {/* ================= BOTTOM SECTION ================= */}
        <div className="row g-4 mb-4">

          {/* SHIPPING ADDRESS */}
          <div className="col-lg-8">

            <div className="row g-4">

              <div className="col-md-6">

                <div className="bg-white border rounded-3 p-4 h-100">

                  <div className="d-flex gap-2 mb-3">

                    <MapPin size={18} className="text-danger" />

                    <h6 className="fw-bold mb-0">
                      Delivery / Shipping Address
                    </h6>

                  </div>

                  <div className="small text-muted">

                    <strong className="text-dark">
                      Mohamed Yasser
                    </strong>

                    <br />

                    25 El-Horreya Street
                    <br />

                    Port Said, Egypt
                    <br />

                    42511

                  </div>

                </div>

              </div>


              {/* PAYMENT */}
              <div className="col-md-6">

                <div className="bg-white border rounded-3 p-4 h-100">

                  <div className="d-flex gap-2 mb-3">

                    <CreditCard
                      size={18}
                      className="text-danger"
                    />

                    <h6 className="fw-bold mb-0">
                      Payment Information
                    </h6>

                  </div>

                  <div className="d-flex justify-content-between">

                    <div className="small">

                      <strong>
                        Visa ending in 4242
                      </strong>

                      <br />

                      <span className="text-muted">
                        Paid on Sep 12, 2026
                      </span>

                    </div>

                    <span className="badge bg-success-subtle text-success">
                      Paid
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* ================= ORDER SUMMARY ================= */}
          <div className="col-lg-4">

            <div className="bg-white border rounded-3 p-4">

              <h6 className="fw-bold mb-4">
                Order Summary
              </h6>


              <div className="d-flex justify-content-between mb-2">
                <span className="small text-muted">
                  Subtotal
                </span>

                <span className="small">
                  $195.00
                </span>
              </div>


              <div className="d-flex justify-content-between mb-2">
                <span className="small text-muted">
                  Shipping
                </span>

                <span className="small">
                  $10.00
                </span>
              </div>


              <div className="d-flex justify-content-between mb-2">
                <span className="small text-muted">
                  Discount
                </span>

                <span className="small text-success">
                  -$5.00
                </span>
              </div>


              <hr />


              <div className="d-flex justify-content-between align-items-center">

                <span className="fw-bold">
                  Total
                </span>

                <span className="fs-5 fw-bold text-danger">
                  $200.00
                </span>

              </div>


              <div className="small text-muted mt-3">
                <Clock3 size={14} className="me-1" />
                Estimated delivery: Sep 18, 2026
              </div>

            </div>

          </div>

        </div>


        {/* ================= FOOTER BUTTONS ================= */}
        <div className="d-flex flex-wrap justify-content-between gap-2">

          <div className="d-flex gap-2">

            <button className="btn btn-danger btn-sm">
              <MessageCircle size={15} className="me-1" />
              Track Live Order
            </button>

            <button className="btn btn-outline-secondary btn-sm">
              <XCircle size={15} className="me-1" />
              Cancel Order
            </button>

          </div>


          <div className="d-flex gap-2">

            <button className="btn btn-outline-dark btn-sm">
              Need Help? Contact Support
            </button>

            <button className="btn btn-dark btn-sm">
              Back to Orders
            </button>

          </div>

        </div>

      </div>


      {/* ================= CSS ================= */}
      <style>{`

        .order-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: #fff1f1;
          color: #dc3545;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Tracking */

        .tracking-wrapper {
          position: relative;
          display: flex;
          justify-content: space-between;
          margin-top: 35px;
        }

        .tracking-line {
          position: absolute;
          top: 17px;
          left: 8%;
          right: 8%;
          height: 2px;
          background: #dee2e6;
          z-index: 0;
        }

        .tracking-line::before {
          content: "";
          position: absolute;
          left: 0;
          width: 55%;
          height: 2px;
          background: #dc3545;
        }

        .tracking-step {
          position: relative;
          z-index: 1;
          width: 20%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .tracking-circle {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: white;
          border: 2px solid #dee2e6;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #adb5bd;
          margin-bottom: 8px;
        }

        .tracking-step.completed .tracking-circle,
        .tracking-step.active .tracking-circle {
          background: #dc3545;
          border-color: #dc3545;
          color: white;
        }

        .tracking-step small {
          font-size: 11px;
        }

        .tracking-step span {
          font-size: 10px;
          color: #6c757d;
          margin-top: 3px;
        }

        /* Activity */

        .activity-item {
          display: flex;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid #f1f1f1;
        }

        .activity-item:last-child {
          border-bottom: none;
        }

        /* Products */

        .product-row {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px 0;
          border-bottom: 1px solid #eee;
        }

        .product-row:last-child {
          border-bottom: none;
        }

        .product-image {
          width: 75px;
          height: 75px;
          object-fit: contain;
          background: #f8f9fa;
          border-radius: 8px;
          padding: 5px;
        }

        @media (max-width: 768px) {

          .tracking-wrapper {
            overflow-x: auto;
            min-width: 600px;
          }

          .tracking-wrapper {
            padding-bottom: 10px;
          }

          .product-row {
            align-items: flex-start;
          }

          .product-row .text-end {
            margin-left: auto;
          }

        }

      `}</style>

    </div>
  );
}