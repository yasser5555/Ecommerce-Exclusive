import React, { useState } from "react";
import { Tag, ArrowRight } from "lucide-react";

export default function Coupon() {
    const [coupon, setCoupon] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!coupon.trim()) {
            return;
        }
        console.log("Coupon entered:", coupon.trim());
        // Coupon API will be added later.
    };

    return (
        <div className="card col border-0 shadow-sm rounded-4 p-4">
            <div className="d-flex align-items-center gap-2 mb-3">
                <div className="bg-danger-subtle text-danger rounded-3 p-2">
                    <Tag size={20} />
                </div>

                <h5 className="fw-bold mb-0">
                    Have a coupon?
                </h5>
            </div>

            <p className="text-secondary small mb-3">
                Enter your coupon code to get a discount on your order.
            </p>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control py-2 px-3 border-end-0"
                        placeholder="Coupon code"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="btn btn-danger px-4 d-flex align-items-center gap-2"
                    >
                        Apply
                        <ArrowRight size={17} />
                    </button>
                </div>
            </form>
        </div>
    );
}