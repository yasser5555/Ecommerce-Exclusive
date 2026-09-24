import React from "react";
import { Pencil, Trash2, Folder } from "lucide-react";

export default function CategoryTable({
  categories,
  search,
  onEdit,
  onDelete,
}) {
   
  return (
    <div className="table-responsive">
      <table className="table align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th className="ps-4">Category</th>
            <th>Products</th>
            <th className="text-end pe-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.length > 0 ? (
            categories.map((categoryItem, index) => (
              <tr key={categoryItem.category_id || index}>
                <td className="ps-4">
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="bg-danger-subtle text-danger rounded-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: "42px",
                        height: "42px",
                      }}
                    >
                      <Folder size={19} />
                    </div>

                    <div>
                      <div className="fw-semibold">
                        {categoryItem.name}
                      </div>

                      <small className="text-muted">
                        Category
                      </small>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="badge bg-light text-dark border rounded-pill px-3 py-2">
                    {categoryItem.product_count || 0} products
                  </span>
                </td>

                <td className="text-end pe-4">
                  <button
                    type="button"
                    className="btn btn-sm btn-light border me-2"
                    title="Edit category"
                    onClick={() => onEdit(categoryItem)}
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    type="button"
                    className="btn btn-sm btn-light border text-danger"
                    title="Delete category"
                    onClick={() => onDelete(categoryItem)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-5">
                <div className="d-flex flex-column align-items-center">
                  <div
                    className="bg-light rounded-circle d-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: "60px",
                      height: "60px",
                    }}
                  >
                    <Folder size={26} className="text-muted" />
                  </div>

                  <h6 className="fw-semibold">
                    {search
                      ? "No categories found"
                      : "No categories available"}
                  </h6>

                  <p className="text-muted small mb-0">
                    {search
                      ? `No category matches "${search}"`
                      : "Create your first category to get started"}
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}