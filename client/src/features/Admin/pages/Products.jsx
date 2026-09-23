import React, { useEffect, useState } from "react";
import { Search, Plus, Pencil, Trash2, Eye, Package } from "lucide-react";
import { useAdminStore } from "../Store/Admin.store";

export default function Products() {
  const {
    productPage,
    products,
    SearchedProduct,
    fetchProductPage,
    fetchProducts,
    SearchForProducts,
  } = useAdminStore();

  // ================= PAGINATION =================

  const [currentPage, setCurrentPage] = useState(1);
  const [title, setTitle] = useState("");

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

        // If search is empty, show all products
        if (title.trim() === "") {
          return;
        }

        console.log("Searching for:", title.trim());

        const result = await SearchForProducts(title.trim());

        console.log("Search result:", result);
      } catch (error) {
        console.error("error at searching products:", error);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [title, SearchForProducts]);

  // ================= PRODUCTS TO DISPLAY =================

  const displayProducts =
    title.trim() !== "" ? SearchedProduct || [] : products || [];

  // ================= TOTAL PRODUCTS =================

  const totalProducts = displayProducts.length;

  // ================= TOTAL PAGES =================

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  // ================= CURRENT PRODUCTS =================

  const startIndex = (currentPage - 1) * productsPerPage;

  const endIndex = startIndex + productsPerPage;

  const currentProducts = displayProducts.slice(startIndex, endIndex);

  // ================= CHANGE PAGE =================

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container-fluid bg-light min-vh-100 p-4">
      {/* ================= HEADER ================= */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Products</h3>

          <p className="text-muted mb-0">
            Manage your products, inventory and pricing
          </p>
        </div>

        <button className="btn btn-dark d-flex align-items-center gap-2 px-3">
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* ================= STATISTICS ================= */}

      <div className="row g-3 mb-4">
        {/* Total Products */}

        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body d-flex align-items-center">
              <div className="bg-primary bg-opacity-10 rounded-3 p-3 me-3">
                <Package size={24} className="text-primary" />
              </div>

              <div>
                <small className="text-muted">Total Products</small>

                <h4 className="fw-bold mb-0">
                  {productPage?.[0]?.[0]?.total_products || 0}
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* In Stock */}

        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body">
              <small className="text-muted">In Stock</small>

              <h4 className="fw-bold mb-0 text-success">
                {productPage?.[1]?.[0]?.in_stock || 0}
              </h4>
            </div>
          </div>
        </div>

        {/* Out Of Stock */}

        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body">
              <small className="text-muted">Out of Stock</small>

              <h4 className="fw-bold mb-0 text-danger">
                {productPage?.[2]?.[0]?.out_of_stock || 0}
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* ================= PRODUCTS CARD ================= */}

      <div className="card border-0 shadow-sm rounded-4">
        {/* ================= SEARCH ================= */}

        <div className="card-header bg-white border-0 p-4">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-light border-0">
                  <Search size={18} />
                </span>

                <input
                  type="text"
                  className="form-control bg-light border-0"
                  placeholder="Search products..."
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <span className="text-muted small">
                Showing {currentProducts.length} of {totalProducts} products
              </span>
            </div>
          </div>
        </div>

        {/* ================= TABLE ================= */}

        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4" style={{ width: "35%" }}>
                  Product
                </th>

                <th style={{ width: "15%" }}>Category</th>

                <th style={{ width: "10%" }}>Price</th>

                <th style={{ width: "10%" }}>Stock</th>

                <th style={{ width: "10%" }}>Rating</th>

                <th style={{ width: "10%" }}>Status</th>

                <th className="text-end pe-4" style={{ width: "10%" }}>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <tr key={product.id || product.p_id}>
                    {/* ================= PRODUCT ================= */}

                    <td className="ps-4">
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={product.product_image || product.image}
                          alt={product.title || product.name}
                          width="55"
                          height="55"
                          className="rounded-3 object-fit-cover"
                        />

                        <div>
                          <div className="fw-semibold">
                            {product.title || product.name}
                          </div>

                          <small className="text-muted">
                            #{product.id || product.p_id}
                          </small>
                        </div>
                      </div>
                    </td>

                    {/* ================= CATEGORY ================= */}

                    <td>
                      <span className="badge bg-light text-dark border">
                        {product.category || `Category #${product.category_id}`}
                      </span>
                    </td>

                    {/* ================= PRICE ================= */}

                    <td>
                      <span className="fw-semibold">
                        $
                        {Number(
                          product.old_price || product.price,
                        ).toLocaleString()}
                      </span>
                    </td>

                    {/* ================= STOCK ================= */}

                    <td>{product.stock}</td>

                    {/* ================= RATING ================= */}

                    <td>
                      <span className="fw-semibold">
                        ⭐ {product.rating ?? 0}
                      </span>

                      <small className="text-muted ms-1">
                        ({product.review_count ?? 0})
                      </small>
                    </td>

                    {/* ================= STATUS ================= */}

                    <td>
                      {product.is_active ? (
                        <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">
                          Active
                        </span>
                      ) : (
                        <span className="badge bg-danger-subtle text-danger rounded-pill px-3 py-2">
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* ================= ACTIONS ================= */}

                    <td className="text-end pe-4">
                      <div className="d-flex justify-content-end gap-2">
                        {/* View */}

                        <button
                          className="btn btn-sm btn-light"
                          title="View"
                          onClick={() =>
                            console.log(product.id || product.p_id)
                          }
                        >
                          <Eye size={16} />
                        </button>

                        {/* Edit */}

                        <button className="btn btn-sm btn-light" title="Edit">
                          <Pencil size={16} />
                        </button>

                        {/* Delete */}

                        <button
                          className="btn btn-sm btn-light text-danger"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-5">
                    <div className="text-muted">
                      {title.trim()
                        ? `No products found for "${title}"`
                        : "No products available"}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

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
