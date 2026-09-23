import React from "react";
import { Package } from "lucide-react";

export default function ProductFilter({
  stockFilter,
  products,
  onStockFilterChange,
}) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h6 className="fw-bold mb-1">Inventory</h6>

        <small className="text-muted">
          Filter products by stock availability
        </small>
      </div>

      <div
        className="bg-white border rounded-4 p-1 shadow-sm d-flex align-items-center gap-1"
        role="group"
        aria-label="Stock filters"
      >
        {/* All */}

        <button
          type="button"
          className={`btn btn-sm rounded-3 px-3 py-2 d-flex align-items-center gap-2 ${
            stockFilter === "all"
              ? "bg-dark text-white"
              : "text-secondary"
          }`}
          onClick={() => onStockFilterChange("all")}
        >
          <Package size={15} />

          <span>All</span>

          <span
            className={`badge rounded-pill ${
              stockFilter === "all"
                ? "bg-white text-dark"
                : "bg-light text-secondary"
            }`}
          >
            {products?.length || 0}
          </span>
        </button>

      

 

        {/* Low Stock */}

        <button
          type="button"
          className={`btn btn-sm rounded-3 px-3 py-2 d-flex align-items-center gap-2 ${
            stockFilter === "low"
              ? "bg-primary text-light"
              : "text-secondary"
          }`}
          onClick={() => onStockFilterChange("low")}
        >
          <span
            className={`rounded-circle ${
              stockFilter === "low" ? "bg-light" : "bg-primary"
            }`}
            style={{
              width: "7px",
              height: "7px",
            }}
          />

          <span>Low Stock</span>
        </button>

        {/* Out Of Stock */}

        <button
          type="button"
          className={`btn btn-sm rounded-3 px-3 py-2 d-flex align-items-center gap-2 ${
            stockFilter === "out"
              ? "bg-danger text-white"
              : "text-secondary"
          }`}
          onClick={() => onStockFilterChange("out")}
        >
          <span
            className={`rounded-circle ${
              stockFilter === "out" ? "bg-white" : "bg-danger"
            }`}
            style={{
              width: "7px",
              height: "7px",
            }}
          />

          <span>Out of Stock</span>
        </button>
      </div>
    </div>
  );
}