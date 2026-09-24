import { Plus, X } from 'lucide-react'
import React from 'react'

export default function CategoryHeader({handleCreate , showModal , setShowModal , editingCategory , handleSubmit , formData , handleChange}) {
  return (
    <>
    <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Categories</h3>

          <p className="text-muted mb-0">
            Organize your products into categories
          </p>
        </div>

        <button
          className="btn btn-dark d-flex align-items-center gap-2"
          onClick={handleCreate}
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>
          {showModal && (
        <div
          className="modal d-block"
          style={{
            backgroundColor: "rgba(0,0,0,.5)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4">
              <div className="modal-header border-0">
                <h5 className="fw-bold">
                  {editingCategory ? "Update Category" : "Create Category"}
                </h5>

                <button
                  className="btn btn-light rounded-circle"
                  onClick={() => setShowModal(false)}
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <label className="form-label fw-semibold">
                    Category Name
                  </label>

                  <input
                    className="form-control mb-3"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                  <label className="form-label fw-semibold">Description</label>

                  <textarea
                    className="form-control"
                    rows="4"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                <div className="modal-footer border-0">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>

                  <button type="submit" className="btn btn-dark">
                    {editingCategory ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
