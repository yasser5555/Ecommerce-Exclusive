import { Package } from 'lucide-react'
import React from 'react'

export default function ProductStatistics({productPage}) {
  return (
    <>
       <div className="row g-3 mb-4">
        {/* Total Products */}

        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body d-flex align-items-center">
              <div className="bg-primary bg-opacity-10 rounded-3 p-3 me-3">
                <Package size={24} className="text-primary" />
              </div>

              <div>
                <small className="text-muted">Total Products</small>

                <h4 className="fw-bold mb-0">
                  {productPage?.[0]?.[0]?.total_products || 0}
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* In Stock */}

        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body">
              <small className="text-muted">In Stock</small>

              <h4 className="fw-bold mb-0 text-success">
                {productPage?.[1]?.[0]?.in_stock || 0}
              </h4>
            </div>
          </div>
        </div>

        {/* Out Of Stock */}

        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body">
              <small className="text-muted">Out of Stock</small>

              <h4 className="fw-bold mb-0 text-danger">
                {productPage?.[2]?.[0]?.out_of_stock || 0}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
