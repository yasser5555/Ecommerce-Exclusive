import { Heart, Package, User } from 'lucide-react'
import React from 'react'

export default function SideBar() {
  return (
   <>
        {/* ================= SIDEBAR ================= */}
          <div className="col-lg-3">
            <div className="bg-white p-4">
              <h6 className="fw-bold mb-3">
                <User size={16} className="me-2" />
                Manage My Account
              </h6>

              <div className="ms-4 text-secondary small">
                <div className="mb-3">My Profile</div>

                <div className="mb-3">Address Book</div>

                <div className="mb-4">My Payment Options</div>
              </div>

              <h6 className="fw-bold text-danger mb-3">
                <Package size={16} className="me-2" />
                My Orders
              </h6>

              <div className="ms-4 small">
                <div className="text-danger fw-semibold mb-3">All Orders</div>

                <div className="text-secondary mb-3">My Returns</div>

                <div className="text-secondary mb-4">My Cancellations</div>
              </div>

              <h6 className="fw-bold mb-4">
                <Heart size={16} className="me-2" />
                My Wishlist
              </h6>

              <div className="border-top pt-3">
                <div className="text-secondary small">Log Out</div>
              </div>

              {/* Help */}
              <div className="bg-light p-3 mt-4">
                <small className="fw-bold text-info">Need Help?</small>

                <p className="small text-secondary mb-2">
                  Browse our FAQ or contact our support team.
                </p>

                <span className="text-danger small fw-semibold">Chat Now</span>
              </div>
            </div>
          </div>
   </>
  )
}
