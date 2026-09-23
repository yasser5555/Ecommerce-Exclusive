import React, { useEffect } from "react";
import useProductBar from "../hooks/useProductBar";
import { FetchOnRender } from "../../../shared/Utils/useFetch";

export default function ProductFilterSidebar() {
  // ! for Rating filter and for sure order is important
  const RatingFilter = [5, 4, 3, 2, 1]; 
  const {
    getCatogeries,
    catogery,
    rating,
    Catogery,
    isCategoriesOpen,
    setIsCategoriesOpen,
    price,
    search,
    setSearch,
    handleCategoryChange,
    handlePriceChange,
    handleRatingChange,
    handleSubmit,
    handleClear,
    products,
    getFilters,
    productSearch,
    FetchProducts,
  } = useProductBar();

  // Render Categories
  FetchOnRender(() => getCatogeries());

  // Live Search with Debounce
  useEffect(() => {
    /*
     * what's live search ?
     * it means response is sent without clicking a button for example:
     * Redmi => Server Search for it in database => Server send Response
     * Problem of live search for search bar:
     * is too many request on server for example
     *  user search for redmin 10 power 128GB black
     * imagining sending each letter as a request for server from one user only :)
     * to Solve this problem we use Debounce:
     * it wait untill user Stops writing from then wait 400ms 0.4 second then send request
     */
    const timer = setTimeout(() => {
      // ! CLear white spaces from search value
      const searchValue = search.trim();
      // ! for empty search bar Fetch products
      if (searchValue === "") {
        FetchProducts({
          page: 1,
          limit: 10,
        });
        return;
      }
      productSearch(searchValue);
    }, 350);
    return () => clearTimeout(timer);
  }, [search, productSearch]);

  // ! Handling Filtering
  useEffect(() => {
    const timer = setTimeout(() => {
      const filtered = {
        Catogery,
        rating,
        minprice: price.min,
        maxprice: price.max,
      };
      getFilters(filtered);
    });

    return () => clearTimeout(timer);
  }, [Catogery, rating, price.min, price.max, getFilters]);

  return (
    <aside className="card border-0 shadow-sm rounded-4 overflow-hidden p-md-0 px-3 h-100">
      <div className="card-header bg-danger text-white border-0 p-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-1 fw-bold">Filters</h5>

            <small className="text-white-50">Find the products you need</small>

            <h6 className="text-white">Product Found {products.length}</h6>
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
          {/* Search */}
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

          {/* Categories */}
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
                    {catogery.length}
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
                        checked={Catogery?.includes(item.category)}
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

          {/* Price */}
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

          {/* Rating */}
          <div className="border-top pt-4">
            <div className="mb-4">
              <h6 className="fw-bold mb-3">Rating</h6>
              <div className="d-flex flex-column gap-2">
                {RatingFilter.map((value) => (
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
          </div>
        </div>
      </form>
    </aside>
  );
}