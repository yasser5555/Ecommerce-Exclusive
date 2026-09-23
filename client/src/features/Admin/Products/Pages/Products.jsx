import React, { useEffect, useState } from "react";
import { Package } from "lucide-react";
import { useAdminProductStore } from "../Store/product.store";
import ProductHeader from "../Component/ProductHeader";
import ProductStatistics from "../Component/ProductStatistics";
import ProductTable from "../Component/ProductTable";
import ProductSearch from "../Component/ProductSearch";
import ProductFilter from "../Component/ProductFilter";

export default function Products() {
const {
  productPage,
  products,
  SearchedProduct,
  fetchProductPage,
  fetchProducts,
  SearchForProducts,
  getLowStock,
  getOutOfStock,
  deleteProduct,
  update_Product,
} = useAdminProductStore();

  // ================= PAGINATION =================

  const [currentPage, setCurrentPage] = useState(1);
  const [title, setTitle] = useState("");

  // ! Stock filter
  const [stockFilter, setStockFilter] = useState("all");

  const productsPerPage = 10;

  // ================= FETCH PAGE DATA =================

  useEffect(() => {
    fetchProductPage();
  }, []);
  // ================= FETCH ALL PRODUCTS =================
  useEffect(() => {
    fetchProducts();
  }, []);
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
    title.trim() !== ""
      ? Array.isArray(SearchedProduct)
        ? SearchedProduct
        : []
      : Array.isArray(products)
        ? products
        : [];

  const totalProducts = displayProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = displayProducts.slice(startIndex, endIndex);
  // ================= CHANGE PAGE =================
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // ================= CHANGE STOCK FILTER =================

  const handleStockFilter = async (filter) => {
    setStockFilter(filter);
    setCurrentPage(1);

    try {
      switch (filter) {
        case "all":
          await fetchProducts();
          break;

        case "low":
          await getLowStock();
          break;

        case "out":
          await getOutOfStock();
          break;

        case "in":
          // We don't have getInStock yet
          await fetchProducts();
          break;

        default:
          break;
      }
    } catch (error) {
      console.error("error at stock filter:", error);
    }
  };
  return (
    <div className="container-fluid bg-light min-vh-100 p-4">
      <ProductHeader />
      {/* ================= STATISTICS ================= */}
      <ProductStatistics productPage={productPage} />
      {/* ================= STOCK FILTERS ================= */}

      <ProductFilter stockFilter={stockFilter} products={products} onStockFilterChange={handleStockFilter} />

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
          deleteProduct={deleteProduct}
          update_Product={update_Product}
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
