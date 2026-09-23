import React, { useEffect, useRef, useState } from "react";
import { Plus, Upload, X, ChevronDown, Check } from "lucide-react";
import { useAdminProductStore } from "../Store/product.store";
import { toast } from "react-toastify";

export default function ProductHeader() {
  const [showModal, setShowModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const fileInputRef = useRef(null);

  const { Catogeries, FetchCatogery, createProduct } = useAdminProductStore();

  const [formData, setFormData] = useState({
    category_id: "",
    title: "",
    description: "",
    old_price: "",
    stock: "",
    product_image: null,
  });

  // =========================
  // FETCH CATEGORIES
  // =========================

  useEffect(() => {
    FetchCatogery();
  }, [FetchCatogery]);

  // =========================
  // INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // CATEGORY CHANGE
  // =========================

  const handleCategoryChange = (category) => {
    setFormData((prev) => ({
      ...prev,
      category_id: category.id,
    }));

    console.log("Selected Category ID:", category.id);

    setCategoryOpen(false);
  };

  // =========================
  // GET SELECTED CATEGORY
  // =========================

  const selectedCategory = Catogeries?.find(
    (category) => String(category.id) === String(formData.category_id),
  );

  // =========================
  // IMAGE
  // =========================

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      product_image: file,
    }));
    toast.success("image Uploaded Successfully");
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      product_image: null,
    }));

    setImagePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.success("image Removed Successfully");
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createProduct(
        formData.category_id,
        formData.title,
        formData.description,
        formData.old_price,
        formData.stock,
        formData.product_image,
      );

      closeModal();
      toast.success("Product Created Successfully");
    } catch (error) {
      toast.error("Error creating product:", error);
    }
  };

  // =========================
  // CLOSE
  // =========================

  const closeModal = () => {
    setShowModal(false);
    setCategoryOpen(false);
    setImagePreview(null);

    setFormData({
      category_id: "",
      title: "",
      description: "",
      old_price: "",
      stock: "",
      product_image: null,
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      {/* ================= HEADER ================= */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Products</h3>

          <p className="text-muted mb-0">
            Manage your products, inventory and pricing
          </p>
        </div>

        <button
          type="button"
          className="btn btn-dark d-flex align-items-center gap-2 px-3 rounded-3"
          onClick={() => setShowModal(true)}
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* ================= MODAL ================= */}

      {showModal && (
        <>
          <div
            className="modal fade show"
            tabIndex="-1"
            style={{ display: "block" }}
          >
            <div
              className="modal-dialog modal-dialog-centered"
              style={{
                maxWidth: "550px",
              }}
            >
              <div className="modal-content border-0 shadow-lg rounded-4">
                {/* ================= HEADER ================= */}

                <div className="modal-header border-0 px-4 pt-3 pb-2">
                  <div>
                    <h5 className="modal-title fw-bold mb-1">Add Product</h5>

                    <small className="text-muted">Create a new product</small>
                  </div>

                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                  />
                </div>

                {/* ================= FORM ================= */}

                <form onSubmit={handleSubmit}>
                  <div className="modal-body px-4 py-3">
                    {/* ================= IMAGE ================= */}

                    <div className="mb-3">
                      <label className="form-label fw-semibold small">
                        Product Image
                      </label>

                      {!imagePreview ? (
                        <div
                          className="border border-2 border-dashed rounded-3 p-3 text-center bg-light"
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload size={26} className="text-muted mb-1" />

                          <div className="fw-semibold small">
                            Upload Product Image
                          </div>

                          <small className="text-muted">
                            Click to choose an image
                          </small>

                          <input
                            ref={fileInputRef}
                            type="file"
                            name="product_image"
                            accept="image/*"
                            className="d-none"
                            onChange={handleImageChange}
                          />
                        </div>
                      ) : (
                        <div className="position-relative">
                          <img
                            src={imagePreview}
                            alt="Product Preview"
                            className="img-fluid rounded-3 border"
                            style={{
                              width: "100%",
                              height: "150px",
                              objectFit: "cover",
                            }}
                          />

                          <button
                            type="button"
                            className="btn btn-danger btn-sm rounded-circle position-absolute top-0 end-0 m-2 d-flex align-items-center justify-content-center"
                            onClick={removeImage}
                            style={{
                              width: "32px",
                              height: "32px",
                            }}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* ================= CATEGORY ================= */}

                    <div className="mb-3">
                      <label className="form-label fw-semibold small">
                        Category
                      </label>

                      <div className="dropdown">
                        <button
                          type="button"
                          className="btn btn-light border w-100 d-flex align-items-center justify-content-between rounded-3 py-2"
                          onClick={() => setCategoryOpen(!categoryOpen)}
                        >
                          <span
                            className={
                              selectedCategory ? "text-dark" : "text-muted"
                            }
                          >
                            {selectedCategory
                              ? selectedCategory.name
                              : "Select a category"}
                          </span>

                          <ChevronDown size={18} className="text-muted" />
                        </button>

                        {categoryOpen && (
                          <div
                            className="dropdown-menu show w-100 shadow border-0 rounded-3 p-2"
                            style={{
                              maxHeight: "180px",
                              overflowY: "auto",
                              position: "absolute",
                              top: "100%",
                              left: 0,
                              zIndex: 1055,
                            }}
                          >
                            {Array.isArray(Catogeries) &&
                            Catogeries.length > 0 ? (
                              Catogeries.map((category) => (
                                <button
                                  key={category.id}
                                  type="button"
                                  className="dropdown-item rounded-2 d-flex align-items-center justify-content-between py-2"
                                  onClick={() => handleCategoryChange(category)}
                                >
                                  <span>{category.name}</span>

                                  {String(formData.category_id) ===
                                    String(category.id) && (
                                    <Check size={17} className="text-danger" />
                                  )}
                                </button>
                              ))
                            ) : (
                              <div className="dropdown-item-text text-muted small">
                                No categories found
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* SELECTED ID */}

                      {formData.category_id && (
                        <div className="mt-1">
                          <small className="text-muted">Category ID:</small>

                          <span className="badge bg-danger-subtle text-danger ms-2">
                            {formData.category_id}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* ================= TITLE ================= */}

                    <div className="mb-3">
                      <label className="form-label fw-semibold small">
                        Product Title
                      </label>

                      <input
                        type="text"
                        name="title"
                        className="form-control rounded-3"
                        placeholder="Enter product title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* ================= DESCRIPTION ================= */}

                    <div className="mb-3">
                      <label className="form-label fw-semibold small">
                        Description
                      </label>

                      <textarea
                        name="description"
                        className="form-control rounded-3"
                        rows="3"
                        placeholder="Enter product description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* ================= PRICE + STOCK ================= */}

                    <div className="row g-3">
                      <div className="col-6">
                        <label className="form-label fw-semibold small">
                          Product-Price
                        </label>

                        <div className="input-group">
                          <span className="input-group-text">$</span>

                          <input
                            type="number"
                            name="old_price"
                            className="form-control"
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            value={formData.old_price}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-6">
                        <label className="form-label fw-semibold small">
                          Stock
                        </label>

                        <input
                          type="number"
                          name="stock"
                          className="form-control"
                          placeholder="0"
                          min="0"
                          value={formData.stock}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* ================= FOOTER ================= */}

                  <div className="modal-footer border-0 px-4 pt-0 pb-3">
                    <button
                      type="button"
                      className="btn btn-light border rounded-3 px-4"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="btn btn-dark rounded-3 px-4"
                    >
                      <Plus size={17} className="me-1" />
                      Add Product
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </>
  );
}
