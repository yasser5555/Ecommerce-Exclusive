import React, { useState } from "react";
import { useProducts } from "../hooks/useProductStore";

export default function ProductFilterSidebar() {
  const { searchResults, getSearchResult, products } = useProducts();
  const [search, setSearch] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    getSearchResult(search.trim());
  };

  const handleClear = () => {
    setSearch("");
    getSearchResult("");
  };

  return (
    <aside className="card border-0 shadow-sm rounded-4 overflow-hidden h-100">
      {/* HEADER */}
      <div className="card-header bg-danger text-white border-0 p-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-1 fw-bold">Filters</h5>
            <small className="text-white-50">Find the products you need</small>
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="btn btn-sm btn-light rounded-pill px-3"
          >
            Clear
          </button>
        </div>
      </div>

      {/* BODY */}
      <div className="card-body p-4 bg-white">
        {/* SEARCH */}
        <div className="mb-4">
          <label className="form-label fw-semibold text-dark mb-2">
            Search Products
          </label>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-control border-end-0 shadow-none"
                placeholder="Search products..."
              />

              <button type="submit" className="btn btn-danger px-3">
                Search
              </button>
            </div>
          </form>
        </div>

        {/* CURRENT SEARCH */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="small fw-semibold text-muted">Current Search</span>

            {searchResults && (
              <span className="badge bg-danger rounded-pill">Active</span>
            )}
          </div>

          <div className="bg-light rounded-3 p-3">
            {searchResults ? (
              <div className="fw-semibold text-dark text-break">
                "{searchResults}"
              </div>
            ) : (
              <span className="text-muted small">No search applied</span>
            )}
          </div>
        </div>

        {/* RESULT COUNT */}
        <div className="border-top pt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted small">Results</span>

            <span className="badge bg-light text-dark border rounded-pill px-3 py-2">
              {products?.length || 0} products
            </span>
          </div>

          {/* APPLY */}
          <button
            type="button"
            className="btn btn-danger w-100 rounded-3 fw-semibold py-2"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </aside>
  );
}
