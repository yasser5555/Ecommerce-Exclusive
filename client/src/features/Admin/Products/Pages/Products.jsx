import React, { useEffect, useState } from "react";
import { Search, Plus, Pencil, Trash2, Eye, Package } from "lucide-react";
import { useAdminProductStore } from "../Store/product.store";
import ProductHeader from "../Component/ProductHeader";
import ProductStatistics from "../Component/ProductStatistics";
import ProductTable from "../Component/ProductTable";
import ProductSearch from "../Component/ProductSearch";

export default function Products() {
  const {
    productPage,
    products,
    SearchedProduct,
    fetchProductPage,
    fetchProducts,
    SearchForProducts,
  } = useAdminProductStore();

  // ================= PAGINATION =================

  const [currentPage, setCurrentPage] = useState(1);
  const [title, setTitle] = useState("");

  // ! Stock filter
  const [stockFilter, setStockFilter] = useState("all");

  const productsPerPage = 10;

  // ================= FETCH PAGE DATA =================

  useEffect(() => {
    const getPageData = async () => {
      try {
        await fetchProductPage();
      } catch (error) {
        console.error(`error at admin product page ${error}`);
      }
    };

    getPageData();
  }, [fetchProductPage]);
  // ================= FETCH ALL PRODUCTS =================
  useEffect(() => {
    const getProductData = async () => {
      try {
        await fetchProducts();
      } catch (error) {
        console.error(`error at admin product page ${error}`);
      }
    };

    getProductData();
  }, [fetchProducts]);
  // ================= SEARCH =================
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        setCurrentPage(1);

        // ! If search is empty, show all products
        if (title.trim() === "") {
          return;
        }
        await SearchForProducts(title);
      } catch (error) {
        console.error("error at searching products:", error);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [title, SearchForProducts]);

  // ================= PRODUCTS TO DISPLAY =================
  const displayProducts =
    title.trim() !== "" ? SearchedProduct || [] : products || [];
  // ================= STOCK FILTER =================
  const filteredProducts = displayProducts.filter((product) => {
    const stock = Number(product.stock);
    // ! Show all products
    if (stockFilter === "all") {
      return true;
    }

    // ! Products with no stock
    if (stockFilter === "out") {
      return stock <= 0;
    }

    // ! Products with low stock
    if (stockFilter === "low") {
      return stock > 0 && stock <= 5;
    }

    // ! Products with enough stock
    if (stockFilter === "in") {
      return stock > 5;
    }
    return true;
  });
  // ================= TOTAL PRODUCTS =================
  const totalProducts = filteredProducts.length;
  // ================= TOTAL PAGES =================
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  // ================= CURRENT PRODUCTS =================
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);
  // ================= CHANGE PAGE =================
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // ================= CHANGE STOCK FILTER =================

  const handleStockFilter = (filter) => {
    setStockFilter(filter);
    setCurrentPage(1);
  };

  return (
    <div className="container-fluid bg-light min-vh-100 p-4">
      <ProductHeader />
      {/* ================= STATISTICS ================= */}
      <ProductStatistics productPage={productPage} />
      {/* ================= STOCK FILTERS ================= */}
      <div className="mb-4">
        <div className="btn-group" role="group" aria-label="Stock filters">
          {/* All */}

          <button
            type="button"
            className={`btn ${
              stockFilter === "all" ? "btn-dark" : "btn-outline-dark"
            }`}
            onClick={() => handleStockFilter("all")}
          >
            All
          </button>

          {/* Out Of Stock */}

          <button
            type="button"
            className={`btn ${
              stockFilter === "out" ? "btn-danger" : "btn-outline-danger"
            }`}
            onClick={() => handleStockFilter("out")}
          >
            Out of Stock
          </button>

          {/* Low Stock */}

          <button
            type="button"
            className={`btn ${
              stockFilter === "low "
                ? "btn-warning "
                : "btn-outline-warning text-dark"
            }`}
            onClick={() => handleStockFilter("low")}
          >
            Low Stock
          </button>

          {/* In Stock */}

          <button
            type="button"
            className={`btn ${
              stockFilter === "in" ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => handleStockFilter("in")}
          >
            In Stock
          </button>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4">
        {/* ================= SEARCH ================= */}

        <ProductSearch
          currentProducts={currentProducts}
          setTitle={setTitle}
          title={title}
          totalProducts={totalProducts}
        />

        {/* ================= TABLE ================= */}

        <ProductTable
          currentProducts={currentProducts}
          title={title}
          stockFilter={stockFilter}
        />
        {/* ================= PAGINATION ================= */}

        {totalProducts > 0 && (
          <div className="card-footer bg-white border-0 p-4">
            <div className="d-flex justify-content-between align-items-center">
              {/* Page Information */}

              <small className="text-muted">
                Showing {startIndex + 1}-{Math.min(endIndex, totalProducts)} of{" "}
                {totalProducts}
              </small>

              {/* Pagination */}

              <nav>
                <ul className="pagination mb-0">
                  {/* Previous */}

                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className={`page-link ${
                        currentPage !== 1 ? "text-danger" : ""
                      }`}
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      Previous
                    </button>
                  </li>

                  {/* Page Numbers */}

                  {Array.from(
                    {
                      length: totalPages,
                    },
                    (_, index) => index + 1,
                  ).map((page) => (
                    <li key={page} className="page-item">
                      <button
                        className={`page-link ${
                          currentPage === page
                            ? "bg-danger text-white border-danger"
                            : "text-danger"
                        }`}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    </li>
                  ))}

                  {/* Next */}

                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className={`page-link ${
                        currentPage !== totalPages ? "text-danger" : ""
                      }`}
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
