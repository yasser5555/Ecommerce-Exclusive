
import React from "react";
import { Search, X } from "lucide-react";

export default function OrderSearch({
  search = "",
  onSearchChange,
  onClear,
  placeholder = "Search by product name...",
  orders = [],
  children,
}) {
  const handleChange = (e) => {
    try {
      if (onSearchChange) {
        onSearchChange(e);
      }
    } catch (error) {
      console.error(
        `Error at OrderSearch handleChange: ${error.message}`
      );
    }
  };

  const handleClear = () => {
    try {
      if (onClear) {
        onClear();
      }
    } catch (error) {
      console.error(
        `Error at OrderSearch handleClear: ${error.message}`
      );
    }
  };

  const normalizedSearch = search.trim().toLowerCase();

  const filteredOrders = orders.filter((order) =>
    order.products?.some((product) =>
      product.name?.toLowerCase().includes(normalizedSearch)
    )
  );

  const totalOrders = normalizedSearch
    ? filteredOrders.length
    : orders.length;

  return (
    <div className="bg-white p-3 mb-4 shadow-sm">
      <div className="input-group">
        <span className="input-group-text bg-light border-0">
          <Search size={16} />
        </span>

        <input
          type="text"
          value={search}
          onChange={handleChange}
          className="form-control bg-light border-0"
          placeholder={placeholder}
        />
      
        {search && (
          <button
            type="button"
            className="btn btn-light border-0"
            onClick={handleClear}
            title="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {children}

      {search.trim() !== "" && (
        <div className="mt-3">
          <small className="text-secondary">
            Search results for{" "}
            <strong className="text-dark">"{search}"</strong>{" "}
            ({totalOrders}{" "}
            {totalOrders === 1 ? "order" : "orders"})
          </small>
        </div>
      )}
    </div>
  );
}

