import React from "react";
import { X } from "lucide-react";

export default function CategoryModal({
  showModal,
  editingCategory,
  formData,
  loading,
  onChange,
  onSubmit,
  onClose,
}) {
  if (!showModal) {
    return null;
  }

  return (
    <>
      <div
        className="modal d-block"
        tabIndex="-1"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.45)",
        }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
            <div className="modal-header border-0 px-4 pt-4">
              <div>
                <h5 className="fw-bold mb-1">
                  {editingCategory
                    ? "Update Category"
                    : "Create Category"}
                </h5>

                <p className="text-muted small mb-0">
                  {editingCategory
                    ? "Update the category name"
                    : "Create a new product category"}
                </p>
              </div>

              <button
                type="button"
                className="btn btn-light rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: "36px",
                  height: "36px",
                }}
                onClick={onClose}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={onSubmit}>
              <div className="modal-body px-4 py-4">
                <label className="form-label fw-semibold">
                  Category Name
                </label>

                <input
                  type="text"
                  className="form-control form-control-lg shadow-none"
                  name="name"
                  placeholder="e.g. Electronics"
                  value={formData.name}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="modal-footer border-0 px-4 pb-4">
                <button
                  type="button"
                  className="btn btn-light border"
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-danger px-4"
                  disabled={loading}
                >
                  {loading
                    ? "Saving..."
                    : editingCategory
                      ? "Update Category"
                      : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
}