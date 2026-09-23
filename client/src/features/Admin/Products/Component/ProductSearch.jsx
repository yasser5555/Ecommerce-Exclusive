import { Search } from 'lucide-react';
import React from 'react'

export default function ProductSearch({currentProducts , title, setTitle , totalProducts}) {
  return (
    <>
          <div className="card-header bg-white border-0 p-4">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="input-group">
                    <span className="input-group-text bg-light border-0">
                      <Search size={18} />
                    </span>
    
                    <input
                      type="text"
                      className="form-control bg-light border-0"
                      placeholder="Search products..."
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </div>
                </div>
    
                <div className="col-md-6 text-md-end mt-3 mt-md-0">
                  <span className="text-muted small">
                    Showing {currentProducts.length} of {totalProducts} products
                  </span>
                </div>
              </div>
            </div>
    </>
  )
}
