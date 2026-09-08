import React, { useEffect, useState } from "react";
import { useProducts } from "../hooks/useProductStore";

export default function ProductFilterSidebar() {
  const [rating, setRating] = useState(null);
  const [catgoeryState, setCatogery] = useState([]);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [price, setPrice] = useState({
    min: "",
    max: "",
  });

  const [search, setSearch] = useState("");

  const {
    searchResults,
    getSearchResult,
    products,
    getCatogeries,
    catogery,
    error,
  } = useProducts();

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;

    setCatogery((prev) => {
      if (checked) {
        return [...prev, value];
      }

      return prev.filter((category) => category !== value);
    });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPrice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const filters = {
      search: search.trim(),
      categories: catgoeryState,
      minPrice: price.min,
      maxPrice: price.max,
    };
    console.log(`min price is ${price.min}`);
    console.log(`max price is ${price.max}`);
    console.log(`Catogery is ${catgoeryState}`);

    getSearchResult(search.trim());
  };

  const handleClear = () => {
    setSearch("");
    setCatogery([]);
    setPrice({
      min: "",
      max: "",
    });

    getSearchResult("");
  };

  useEffect(() => {
    getCatogeries();
  }, []);

  return (
    <aside className="card border-0 shadow-sm rounded-4 overflow-hidden h-100">
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

      <form onSubmit={handleSubmit}>
        <div className="card-body p-4 bg-white">
          <div className="mb-4">
            <label
              htmlFor="product-search"
              className="form-label fw-semibold text-dark mb-2"
            >
              Search Products
            </label>

            <div className="input-group">
              <input
                id="product-search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-control shadow-none"
                placeholder="Search products..."
              />
            </div>
          </div>

          <div className="mb-4 border-bottom pb-3">
            <button
              type="button"
              onClick={() => setIsCategoriesOpen((prev) => !prev)}
              className="btn w-100 p-0 border-0 bg-transparent shadow-none"
            >
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="fw-bold mb-0">Categories</h6>

                <div className="d-flex align-items-center gap-2">
                  <span className="badge bg-light text-dark border">
                    {catgoeryState.length}
                  </span>

                  <span
                    className={`fs-5 ${isCategoriesOpen ? "rotate-180" : ""}`}
                    style={{
                      transition: "transform 0.2s ease",
                    }}
                  >
                    ▾
                  </span>
                </div>
              </div>
            </button>

            <div
              className={`overflow-hidden ${isCategoriesOpen ? "mt-3" : ""}`}
              style={{
                maxHeight: isCategoriesOpen ? "400px" : "0px",
                opacity: isCategoriesOpen ? 1 : 0,
                transition: "max-height 0.3s ease, opacity 0.2s ease",
              }}
            >
              <div className="category-list">
                {catogery?.map((item) => (
                  <div
                    key={item.category}
                    className="d-flex align-items-center justify-content-between gap-3 py-2"
                  >
                    <div className="d-flex align-items-center gap-2 min-w-0">
                      <input
                        type="checkbox"
                        id={`category-${item.category}`}
                        name="category"
                        value={item.category}
                        checked={catgoeryState.includes(item.category)}
                        onChange={handleCategoryChange}
                        className="form-check-input flex-shrink-0"
                      />

                      <label
                        htmlFor={`category-${item.category}`}
                        className="form-check-label text-truncate"
                      >
                        {item.category}
                      </label>
                    </div>

                    <span className="badge bg-light text-dark border flex-shrink-0">
                      {item.product_number}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h6 className="fw-bold mb-3">Price Range</h6>

            <div className="row g-3">
              <div className="col-12 col-sm-6">
                <label
                  htmlFor="min-price"
                  className="form-label small fw-semibold"
                >
                  Min Price
                </label>

                <div className="input-group">
                  <span className="input-group-text bg-light">$</span>

                  <input
                    id="min-price"
                    name="min"
                    type="number"
                    min="0"
                    value={price.min}
                    onChange={handlePriceChange}
                    className="form-control shadow-none"
                    placeholder="Min"
                  />
                </div>
              </div>

              <div className="col-12 col-sm-6">
                <label
                  htmlFor="max-price"
                  className="form-label small fw-semibold"
                >
                  Max Price
                </label>

                <div className="input-group">
                  <span className="input-group-text bg-light">$</span>

                  <input
                    id="max-price"
                    name="max"
                    type="number"
                    min="0"
                    value={price.max}
                    onChange={handlePriceChange}
                    className="form-control shadow-none"
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-top pt-4">
            <div className="mb-4">
              <h6 className="fw-bold mb-3">Rating</h6>

              <div className="d-flex flex-column gap-2">
                {[5, 4, 3].map((value) => (
                  <label
                    key={value}
                    htmlFor={`rating-${value}`}
                    className="d-flex align-items-center gap-2 p-2 rounded-3"
                    style={{ cursor: "pointer" }}
                  >
                    <input
                      type="radio"
                      id={`rating-${value}`}
                      name="rating"
                      value={value}
                      checked={rating === String(value)}
                      onChange={handleRatingChange}
                      className="form-check-input"
                    />

                    <span className="text-warning">
                      {"★".repeat(value)}
                      <span className="text-secondary">
                        {"★".repeat(5 - value)}
                      </span>
                    </span>

                    <span className="small text-muted">{value} & up</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-danger w-100 rounded-3 fw-semibold py-2"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </form>
    </aside>
  );
}
