import { Plus } from 'lucide-react'
import React from 'react'

export default function ProductHeader() {
  return (
    <>
     {/* ================= HEADER ================= */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Products</h3>

          <p className="text-muted mb-0">
            Manage your products, inventory and pricing
          </p>
        </div>

        <button className="btn btn-dark d-flex align-items-center gap-2 px-3">
          <Plus size={18} />
          Add Product
        </button>
      </div>
    </>
  )
}
