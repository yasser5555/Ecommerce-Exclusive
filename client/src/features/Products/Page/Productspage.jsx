import React from "react";
import ProductCard from "../component/Product-card";
import ProductFilterSidebar from "../component/ProductFilterSidebar";

import useProductPage from "../hooks/useProductPage";
import useHeavyFetchOnRender from "../../../shared/Utils/useheavyFetch";
import useWishlist from "../../Wishlist/Hooks/useWishlist";

export default function Productspage() {
  const {
    filters,
    searchResults,
    products,
    pagination,
    limit,
    page,
    navigate,
    getProducts,
    search,
    filteredData,
    handlePageChange,
  } = useProductPage();
  const { wishlist } = useWishlist();

  const getWishlistStatus = (product_id) => {
    const wishlistProduct = wishlist?.find((item) => item.p_id === product_id);

    return wishlistProduct?.isWishList ?? 0;
  };
  useHeavyFetchOnRender(() => {
    // 1. Search
    if (searchResults.trim()) {
      search();
      return;
    }

    // 2. Filters
    const hasFilters =
      filters.Catogery ||
      filters.rating ||
      filters.minprice ||
      filters.maxprice;

    if (hasFilters) {
      filteredData();
      return;
    }

    // 3. Normal products
    getProducts();
  }, [searchResults, page, limit, filters]);

  return (
    <main className="container py-4 py-lg-5">
      <div className="row g-4">
        <aside className="col-12 col-lg-3">
          <div className="sticky-lg-top z-0" style={{ top: "1rem" }}>
            <ProductFilterSidebar />
          </div>
        </aside>

        <section className="col-12 col-lg-9">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold mb-1">Products</h2>

              <p className="text-muted mb-0">
                {searchResults
                  ? `Search results for "${searchResults}"`
                  : "Browse our latest products"}
              </p>
            </div>

            {!searchResults && (
              <span className="text-muted">
                Page {page} of {pagination?.totalPages || 0}
              </span>
            )}
          </div>

          <div className="row g-3 g-md-4">
            {products?.length === 0 ? (
              <div className="container py-5 text-center">
                <h2>Product not found</h2>
                <p className="text-muted">
                  The product you're looking for doesn't exist.
                </p>
              </div>
            ) : (
              products?.map((product) => (
                <div key={product.p_id} className="col-6 col-md-4">
                  <ProductCard
                    isactive={getWishlistStatus(product.p_id)}
                    product={product}
                    callback={() => {
                      navigate(`/products/${product.p_id}`);
                    }}
                  />
                </div>
              ))
            )}
          </div>

          {!searchResults && (
            <nav className="mt-5">
              <ul className="pagination justify-content-center flex-wrap gap-1">
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                  >
                    Previous
                  </button>
                </li>

                {Array.from(
                  {
                    length: pagination?.totalPages || 0,
                  },
                  (_, index) => index + 1,
                ).map((pageNumber) => (
                  <li
                    key={pageNumber}
                    className={`page-item ${
                      pageNumber === page ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  </li>
                ))}

                <li
                  className={`page-item ${
                    page >= (pagination?.totalPages || 1) ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= (pagination?.totalPages || 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </section>
      </div>
    </main>
  );
}
