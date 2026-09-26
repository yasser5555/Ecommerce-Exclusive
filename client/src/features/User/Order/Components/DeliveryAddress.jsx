import {
  ArrowRight,
  CreditCard,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function DeliveryAddress({
  profile,
  selectedAddress,
  paymentMethod,
  selectedCard,
}) {
  const navigate = useNavigate();
 
 
  return (
    <div className="col-lg-4">
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h6 className="fw-bold mb-3 d-flex align-items-center gap-2">
            <MapPin size={16} className="text-danger" />
            Delivery Address
          </h6>

          <div className="bg-light rounded p-3">
            <div className="d-flex justify-content-between">
              <strong>
                {profile?.first_name} {profile?.last_name}
              </strong>

              <span className="badge bg-secondary">Default</span>
            </div>

            <div className="small text-muted mt-2">
              <p className="mb-2 d-flex align-items-center gap-2">
                <MapPin size={12} />
                {selectedAddress?.city}, {selectedAddress?.country}
              </p>

              <p className="mb-2 d-flex align-items-center gap-2">
                <Phone size={12} />
                {profile?.phone_number}
              </p>

              <p className="mb-0 d-flex align-items-center gap-2">
                <Mail size={12} />
                {profile?.email}
              </p>
            </div>
          </div>

          <h6 className="fw-bold mt-4 mb-3">Payment Specification</h6>

          <div className="border rounded p-3">
            <div className="d-flex align-items-center gap-2">
              <div className="bg-danger-subtle text-danger p-2 rounded">
                <CreditCard size={16} />
              </div>

              <div className="flex-grow-1">
                <strong className="d-block small">
                  {paymentMethod === "card"
                    ? "Credit Card" 
                    : "Cash on Delivery"}
                </strong>

                {paymentMethod === "card" && selectedCard && (
                  <span className="text-muted small">
                    Balance: ${Number(selectedCard.balance).toLocaleString()}
                  </span>
                )}
              </div>

              <span
                className={`badge ${
                  paymentMethod === "card"
                    ? "bg-success-subtle text-success"
                    : "bg-warning-subtle text-warning"
                }`}
              >
                {paymentMethod === "card"
                  ? "Paid by Card"
                  : "Pending on Delivery"}
              </span>
            </div>

            {paymentMethod === "card" && selectedCard && (
              <div className="border-top mt-3 pt-3 d-flex justify-content-between align-items-center">
                <span className="text-muted small">Remaining Balance</span>

                <h6 className="fw-bold text-danger mb-0">
                  ${Number(selectedCard.balance).toFixed(2)}
                </h6>
              </div>
            )}
          </div>
          <div className="alert alert-light border mt-3 mb-0">
            <div className="d-flex gap-2">
              <ShieldCheck size={18} className="text-danger" />

              <div>
                <strong className="small d-block">
                  Buyer Protection & Confirmation
                </strong>

                <small className="text-muted">
                  Your order information has been securely saved. A receipt will
                  be generated after delivery.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h6 className="fw-bold mb-3">Next Actions</h6>

          <button
            onClick={() => navigate("/myorders")}
            className="btn btn-danger w-100 mb-2 d-flex align-items-center justify-content-center gap-2"
          >
            View My Orders
            <ArrowRight size={15} />
          </button>

          <button
            onClick={() => navigate("/products")}
            className="btn btn-light border w-100 mb-2 d-flex align-items-center justify-content-center gap-2"
          >
            <ShoppingCart size={15} />
            Continue Shopping
          </button>
        </div>
      </div>

      <div className="card bg-dark text-white border-0">
        <div className="card-body d-flex align-items-center gap-2">
          <div className="bg-secondary rounded p-2">
            <MessageCircle size={16} />
          </div>

          <div className="flex-grow-1">
            <strong className="small d-block">
              Need help with your order?
            </strong>

            <small className="text-white-50">
              Our support specialists are 24/7 active
            </small>
          </div>

          <button className="btn btn-light btn-sm">Chat Now</button>
        </div>
      </div>
    </div>
  );
}
