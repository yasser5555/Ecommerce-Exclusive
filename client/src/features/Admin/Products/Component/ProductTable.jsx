import { Eye, Pencil, Trash2 } from 'lucide-react';
import React from 'react'

export default function ProductTable({currentProducts,title,stockFilter}) {
  return (
    <>
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

                    <td>
                      <span
                        className={`fw-semibold ${
                          Number(product.stock) === 0
                            ? "text-danger"
                            : Number(product.stock) <= 5
                              ? "text-warning"
                              : "text-success"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>

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
                          <Pencil
                            onClick={() => {
                              return (
                                <div class="modal" tabindex="-1">
                                  <div class="modal-dialog">
                                    <div class="modal-content">
                                      <div class="modal-header">
                                        <h5 class="modal-title">Modal title</h5>
                                        <button
                                          type="button"
                                          class="btn-close"
                                          data-bs-dismiss="modal"
                                          aria-label="Close"
                                        ></button>
                                      </div>
                                      <div class="modal-body">
                                        <p>Modal body text goes here.</p>
                                      </div>
                                      <div class="modal-footer">
                                        <button
                                          type="button"
                                          class="btn btn-secondary"
                                          data-bs-dismiss="modal"
                                        >
                                          Close
                                        </button>
                                        <button
                                          type="button"
                                          class="btn btn-primary"
                                        >
                                          Save changes
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            }}
                            size={16}
                          />
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
                        : stockFilter === "out"
                          ? "No out of stock products"
                          : stockFilter === "low"
                            ? "No low stock products"
                            : stockFilter === "in"
                              ? "No in-stock products"
                              : "No products available"}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
    </>
  )
}
