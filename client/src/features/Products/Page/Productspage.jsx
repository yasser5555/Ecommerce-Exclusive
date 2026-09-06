import React, { useEffect } from "react";
import ProductCard from "../component/Product-card";
import ProductFilterSidebar from "../component/ProductFilterSidebar";
import { useProducts } from "./../hooks/useProductStore";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Productspage() {
  const [searchParams, setSearchParams] = useSearchParams({
    page: 1,
    limit: 10,
  });
  const page = Number(searchParams.get("page"));
  const limit = Number(searchParams.get("limit"));
  const navigate = useNavigate();
  const { searchResults, products, pagination, FetchProducts, productSearch } =
    useProducts();
  useEffect(() => {
    const getProducts = async () => {
      try {
        await FetchProducts({
          page,
          limit,
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();
  }, [page, limit, searchResults, FetchProducts]);
  useEffect(() => {
    if (!searchResults.trim()) {
      return;
    }

    const search = async () => {
      try {
        console.log("SEARCH RESULTS FROM STORE:", searchResults);
        await productSearch(searchResults);
      } catch (error) {
        console.error("Error searching products:", error);
      }
    };

    search();
  }, [searchResults, productSearch]);

  const handlePageChange = (newPage) => {
    setSearchParams({
      page: newPage,
      limit: limit,
    });
  };

  return (
    <main className="container py-4 py-lg-5">
      <div className="row g-4">
        {/* SIDEBAR */}

        <aside className="col-12 col-lg-3">
          <div className="sticky-lg-top z-0" style={{ top: "1rem" }}>
            <ProductFilterSidebar />
          </div>
        </aside>

        {/* PRODUCTS */}

        <section className="col-12 col-lg-9">
          {/* HEADER */}

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

          {/* PRODUCT GRID */}

          <div className="row g-3 g-md-4">
            {products?.map((product) => (
              <div key={product.id} className="col-6 col-md-4">
                <ProductCard
                  product={product}
                  callback={() => {
                    navigate(`/products/${product.id}`);
                  }}
                />
              </div>
            ))}
          </div>

          {/* PAGINATION */}

          {!searchResults && (
            <nav className="mt-5">
              <ul className="pagination justify-content-center flex-wrap gap-1">
                {/* PREVIOUS */}

                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                  >
                    Previous
                  </button>
                </li>

                {/* PAGE NUMBERS */}

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

                {/* NEXT */}

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
