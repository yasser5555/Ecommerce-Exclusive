import React from "react";
export default function ProductFilterSidebar() {
  return (
    <aside className="card border-0 bg-danger text-white shadow-sm rounded-4 h-100">
      <div className="card-body p-4">
        {/* ================= HEADER ================= */}
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <span className="text-danger small fw-semibold text-uppercase">
              Shop
            </span>

            <h5 className="fw-bold mb-1 mt-1">Filter Products</h5>

            <p className="small mb-0">
              Find exactly what you're looking for
            </p>
          </div>

          <button
            type="button"
            className="btn btn-sm btn-light border rounded-pill px-3"
          >
            Clear
          </button>
        </div>

        {/* ================= SEARCH ================= */}
        <div className="mb-4">
          <label className="form-label small fw-semibold">
            Search
          </label>

          <div className="input-group">
 

            <input
              type="text"
              className="form-control bg-light border-start-0 rounded-end-3 shadow-none"
              placeholder="Search products..."
            />
          </div>
        </div>

        <hr className="border-light-subtle" />
        {/* ================= CATEGORY ================= */}
        <div className="py-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <label className="small fw-bold mb-0">Category</label>
            <span className="badge bg-light text-dark rounded-pill">5</span>
          </div>
          <div className="d-flex flex-column gap-2">
            {[
              ["all", "All Categories", "128"],
              ["electronics", "Electronics", "42"],
              ["clothing", "Clothing", "31"],
              ["shoes", "Shoes", "24"],
              ["accessories", "Accessories", "31"],
            ].map(([id, name, count], index) => (
              <label
                key={id}
                htmlFor={id}
                className="d-flex align-items-center justify-content-between p-2 rounded-3"
                style={{ cursor: "pointer" }}
              >
                <div className="form-check mb-0">
                  <input
                    id={id}
                    name="category"
                    type="radio"
                    className="form-check-input "
                    defaultChecked={index === 0}
                  />

                  <span className="form-check-label small ms-1">{name}</span>
                </div>

                <span className="small">{count}</span>
              </label>
            ))}
          </div>
        </div>

        <hr className="border-light-subtle" />

        {/* ================= PRICE ================= */}
        <div className="py-3">
          <label className="small fw-bold mb-3">Price Range</label>

          <div className="row g-2">
            <div className="col-6">
              <div className="position-relative">
                <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted small">
                  $
                </span>

                <input
                  type="number"
                  className="form-control rounded-3 ps-4 shadow-none"
                  placeholder="Min"
                />
              </div>
            </div>

            <div className="col-6">
              <div className="position-relative">
                <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted small">
                  $
                </span>

                <input
                  type="number"
                  className="form-control rounded-3 ps-4 shadow-none"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between mt-2">
            <span className=" small">$0</span>
            <span className=" small">$5,000+</span>
          </div>
        </div>
         
        {/* ================= RATING ================= */}
        <div className="py-1">
          <label className="small fw-bold mb-3">Customer Rating</label>

          <div className="d-flex flex-column gap-2">
            {[
              ["rating4", "4.0 & above"],
              ["rating3", "3.0 & above"],
              ["rating2", "2.0 & above"],
            ].map(([id, label]) => (
              <div className="form-check d-flex align-items-center" key={id}>
                <input id={id} className="form-check-input" type="checkbox" />
                <label htmlFor={id} className="form-check-label small ms-1">
                  <span className="text-warning">★★★★★</span>
                  <span className=" ms-2">{label}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-light-subtle" />
        {/* ================= SORT ================= */}
        <div className="py-3">
          <label className="small fw-bold mb-2">Sort Products</label>
          <select className="form-select rounded-3 shadow-none">
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Best Selling</option>
            <option>Highest Rated</option>
          </select>
        </div>

        {/* ================= APPLY ================= */}
        <div className="pt-3">
          <button
            type="button"
            className="btn btn-danger btn-outline-light w-100 rounded-3 fw-semibold py-2"
          >
            Apply Filters
          </button>

          <div className="text-center mt-2">
            <span className="small">128 products available</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
