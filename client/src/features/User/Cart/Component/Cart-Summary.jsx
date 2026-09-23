import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Truck } from "lucide-react";

import useCartSummary from "../Hooks/useCartSummary";
import { toast } from "react-toastify";

export default function CartSummary() {
  const navigate = useNavigate()
  const { cart, total } = useCartSummary();

  return (
    <div className="card col-lg col-12 border-0 shadow-sm rounded-4 p-4">
      <h4 className="fw-bold mb-4">Cart Summary</h4>

      <div className="d-flex justify-content-between align-items-center pb-3 border-bottom">
        <span className="text-secondary">Subtotal</span>

        <span className="fw-semibold">${total.toFixed(2)}</span>
      </div>

      <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
        <span className="text-secondary">Shipping</span>

        <span className="text-success fw-semibold">Free</span>
      </div>

      <div className="d-flex justify-content-between align-items-center py-4">
        <span className="fs-5 fw-bold">Total</span>

        <span className="fs-5 fw-bold text-danger">${total.toFixed(2)}</span>
      </div>

      <div className="bg-light rounded-3 p-3 mb-4">
        <div className="d-flex align-items-center gap-2">
          <Truck size={19} className="text-danger" />

          <div>
            <small className="fw-semibold d-block">Free Shipping</small>

            <small className="text-secondary">
              Your order will be delivered for free
            </small>
          </div>
        </div>
      </div>

      <button
      onClick={()=>{
        if (cart?.length > 0) {
          navigate("/checkout");
        }
        else{
          toast.info("please add Product to your cart")
        }
      }}
        className="btn btn-danger w-100 py-3 rounded-3 fw-semibold d-flex align-items-center justify-content-center gap-2"
      >
        Proceed to Checkout
        <ArrowRight size={18} />
      </button>
    </div>
  );
}
