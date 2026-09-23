import { Pencil, Trash2, Star } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function ProductTable({
  currentProducts,
  title,
  stockFilter,
  deleteProduct,
  update_Product,
}) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [editForm, setEditForm] = useState({
    title: "",
    price: "",
    stock: "",
  });

  // =========================
  // EDIT
  // =========================

  const handleEdit = (product) => {
    setSelectedProduct(product);

    setEditForm({
      title: product.title || product.name || "",
      price: product.old_price || product.price || "",
      stock: product.stock ?? "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProduct = async () => {
    if (!selectedProduct) return;

    const productId = selectedProduct.id || selectedProduct.p_id;

    try {
      setIsUpdating(true);

      const updates = [];

      // TITLE
      const oldTitle = selectedProduct.title || selectedProduct.name || "";

      if (editForm.title.trim() !== oldTitle) {
        updates.push({
          column: "title",
          value: editForm.title.trim(),
        });
      }

      // PRICE
      const oldPrice = Number(
        selectedProduct.old_price || selectedProduct.price,
      );

      const newPrice = Number(editForm.price);

      if (newPrice !== oldPrice) {
        updates.push({
          column: "old_price",
          value: newPrice,
        });
      }

      // STOCK
      const oldStock = Number(selectedProduct.stock);
      const newStock = Number(editForm.stock);

      if (newStock !== oldStock) {
        updates.push({
          column: "stock",
          value: newStock,
        });
      }

      // NO CHANGES
      if (updates.length === 0) {
        toast.warning("No changes were made.");
        return;
      }

      // UPDATE DATABASE
      for (const update of updates) {
        await update_Product(update.column, update.value, productId);
      }

      setSelectedProduct(null);

      toast.success("Product updated successfully!");
    } catch (error) {
      console.error(`Product cannot be updated because of ${error}`);

      toast.error("Failed to update product.");
    } finally {
      setIsUpdating(false);
    }
  };

  // =========================
  // DELETE
  // =========================

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;

    const productId = productToDelete.id || productToDelete.p_id;

    try {
      setIsDeleting(true);

      await deleteProduct(productId);

      setProductToDelete(null);

      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error(`Product cannot be deleted because of ${error}`);

      toast.error("Failed to delete product.");
    } finally {
      setIsDeleting(false);
    }
  };

  const closeModal = () => {
    if (isUpdating) return;

    setSelectedProduct(null);
  };

  // =========================
  // STOCK STATUS
  // =========================

  const getStockStatus = (stock) => {
    const value = Number(stock);

    if (value <= 0) {
      return {
        text: "Out of stock",
        className: "bg-danger-subtle text-danger",
      };
    }

    if (value <= 5) {
      return {
        text: "Low stock",
        className: "bg-warning-subtle text-warning-emphasis",
      };
    }

    return {
      text: "In stock",
      className: "bg-success-subtle text-success",
    };
  };

  return (
    <>
      {/* ================================================= */}
      {/* TABLE */}
      {/* ================================================= */}

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        {/* TABLE HEADER */}

        <div className="card-header bg-white border-0 px-4 py-3">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
            <div>
              <h5 className="fw-bold mb-1">Products</h5>

              <p className="text-muted small mb-0">
                Manage your store products
              </p>
            </div>

            <div className="text-muted small">
              {currentProducts?.length || 0} products
            </div>
          </div>
        </div>

        {/* TABLE */}

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4 py-3 text-muted small fw-semibold">
                  PRODUCT
                </th>

                <th className="py-3 text-muted small fw-semibold">CATEGORY</th>

                <th className="py-3 text-muted small fw-semibold">PRICE</th>

                <th className="py-3 text-muted small fw-semibold">STOCK</th>

                <th className="py-3 text-muted small fw-semibold">RATING</th>

                <th className="py-3 text-muted small fw-semibold">STATUS</th>

                <th className="py-3 text-muted small fw-semibold text-end pe-4">
                  ACTIONS
                </th>
              </tr>
            </thead>

            <tbody>
              {currentProducts?.length > 0 ? (
                currentProducts.map((product) => {
                  const productId = product.id || product.p_id;

                  const productName =
                    product.title || product.name || "Unnamed Product";

                  const image = product.product_image || product.image;

                  const category =
                    product.category || product.category || "Uncategorized";

                  const price = product.old_price ?? product.price ?? 0;

                  const stock = product.stock ?? 0;

                  const rating = product.rating ?? 0;

                  const reviewCount =
                    product.review_count ?? product.reviews_count ?? 0;

                  const stockStatus = getStockStatus(stock);

                  return (
                    <tr key={productId}>
                      {/* PRODUCT */}

                      <td className="ps-4 py-3">
                        <div className="d-flex align-items-center gap-3">
                          {/* IMAGE */}

                          <div
                            className="rounded-3 overflow-hidden bg-light flex-shrink-0"
                            style={{
                              width: "52px",
                              height: "52px",
                            }}
                          >
                            {image ? (
                              <img
                                src={
                                  image.startsWith("http")
                                    ? image
                                    : `http://localhost:5000/${image}`
                                }
                                alt={productName}
                                className="w-100 h-100 object-fit-cover"
                              />
                            ) : (
                              <div className="w-100 h-100 d-flex align-items-center justify-content-center text-muted">
                                <span className="small">N/A</span>
                              </div>
                            )}
                          </div>

                          {/* NAME */}

                          <div className="min-w-0">
                            <div
                              className="fw-semibold text-dark text-truncate"
                              style={{
                                maxWidth: "220px",
                              }}
                            >
                              {productName}
                            </div>

                            <div className="text-muted small">
                              ID #{productId}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* CATEGORY */}

                      <td>
                        <span className="badge bg-light text-danger fw-bold border fw-normal px-3 py-2">
                          {category}
                        </span>
                      </td>

                      {/* PRICE */}

                      <td>
                        <div className="fw-semibold">
                          ${Number(price).toFixed(2)}
                        </div>
                      </td>

                      {/* STOCK */}

                      <td>
                        <div className="fw-semibold">{stock}</div>

                        <div className="text-muted small">units</div>
                      </td>

                      {/* RATING */}

                      <td>
                        <div className="d-flex align-items-center gap-1">
                          <Star
                            size={15}
                            fill="currentColor"
                            className="text-warning"
                          />

                          <span className="fw-semibold">
                            {Number(rating).toFixed(1)}
                          </span>
                        </div>

                        <div className="text-muted small">
                          {reviewCount} reviews
                        </div>
                      </td>

                      {/* STATUS */}

                      <td>
                        <span
                          className={`badge rounded-pill px-3 py-2 ${stockStatus.className}`}
                        >
                          {stockStatus.text}
                        </span>
                      </td>

                      {/* ACTIONS */}

                      <td className="text-end pe-4">
                        <div className="d-flex justify-content-end gap-2">
                          {/* EDIT */}

                          <button
                            type="button"
                            className="btn btn-light border rounded-3 d-flex align-items-center justify-content-center"
                            style={{
                              width: "38px",
                              height: "38px",
                            }}
                            onClick={() => handleEdit(product)}
                            title="Edit product"
                          >
                            <Pencil size={17} />
                          </button>

                          {/* DELETE */}

                          <button
                            type="button"
                            className="btn btn-danger rounded-3 d-flex align-items-center justify-content-center"
                            style={{
                              width: "38px",
                              height: "38px",
                            }}
                            onClick={() => setProductToDelete(product)}
                            title="Delete product"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                /* EMPTY STATE */

                <tr>
                  <td colSpan="7" className="text-center py-5">
                    <div className="text-muted">
                      <div
                        className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                        style={{
                          width: "60px",
                          height: "60px",
                        }}
                      >
                        <span className="fs-4">📦</span>
                      </div>

                      <h6 className="fw-semibold text-dark">
                        No products found
                      </h6>

                      <p className="small mb-0">
                        Try changing your search or filter.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================================================= */}
      {/* EDIT MODAL */}
      {/* ================================================= */}

      {selectedProduct && (
        <>
          <div
            className="modal fade show"
            tabIndex="-1"
            style={{ display: "block" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 shadow-lg rounded-4">
                <div className="modal-header border-0">
                  <div>
                    <h5 className="modal-title fw-bold">Edit Product</h5>

                    <small className="text-muted">
                      Update product information
                    </small>
                  </div>

                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                    disabled={isUpdating}
                  />
                </div>

                <div className="modal-body px-4">
                  {/* TITLE */}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Product Name
                    </label>

                    <input
                      type="text"
                      name="title"
                      className="form-control form-control-lg"
                      value={editForm.title}
                      onChange={handleEditChange}
                      disabled={isUpdating}
                    />
                  </div>

                  {/* PRICE */}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Price</label>

                    <div className="input-group input-group-lg">
                      <span className="input-group-text">$</span>

                      <input
                        type="number"
                        name="price"
                        className="form-control"
                        value={editForm.price}
                        onChange={handleEditChange}
                        disabled={isUpdating}
                      />
                    </div>
                  </div>

                  {/* STOCK */}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Stock</label>

                    <input
                      type="number"
                      name="stock"
                      className="form-control form-control-lg"
                      value={editForm.stock}
                      onChange={handleEditChange}
                      disabled={isUpdating}
                    />
                  </div>
                </div>

                <div className="modal-footer border-0 px-4 pb-4">
                  <button
                    type="button"
                    className="btn btn-light border px-4"
                    onClick={closeModal}
                    disabled={isUpdating}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger px-4"
                    onClick={handleUpdateProduct}
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Updating..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-backdrop fade show"></div>
        </>
      )}

      {/* ================================================= */}
      {/* DELETE MODAL */}
      {/* ================================================= */}

      {productToDelete && (
        <>
          <div
            className="modal fade show"
            tabIndex="-1"
            style={{ display: "block" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 shadow-lg rounded-4">
                <div className="modal-header border-0">
                  <h5 className="modal-title fw-bold">Delete Product</h5>

                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setProductToDelete(null)}
                    disabled={isDeleting}
                  />
                </div>

                <div className="modal-body text-center py-4">
                  <div
                    className="bg-danger-subtle text-danger rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{
                      width: "64px",
                      height: "64px",
                    }}
                  >
                    <Trash2 size={28} />
                  </div>

                  <h5 className="fw-bold">Delete this product?</h5>

                  <p className="text-muted mb-1">You are about to delete</p>

                  <p className="fw-semibold mb-3">
                    {productToDelete.title || productToDelete.name}
                  </p>

                  <small className="text-muted">
                    The product will be removed from the active products list.
                  </small>
                </div>

                <div className="modal-footer border-0">
                  <button
                    type="button"
                    className="btn btn-light border px-4"
                    onClick={() => setProductToDelete(null)}
                    disabled={isDeleting}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger px-4"
                    onClick={handleDeleteProduct}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete Product"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </>
  );
}
