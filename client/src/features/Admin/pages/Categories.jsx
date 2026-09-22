import React, { useState } from "react";
import { Plus, Pencil, Trash2, Search, Folder, X } from "lucide-react";

export default function Categories() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Electronics",
      description: "Electronic devices and accessories",
      products: 42,
      status: "Active",
    },
    {
      id: 2,
      name: "Shoes",
      description: "Men and women shoes",
      products: 28,
      status: "Active",
    },
    {
      id: 3,
      name: "Clothing",
      description: "Clothes and fashion products",
      products: 35,
      status: "Active",
    },
    {
      id: 4,
      name: "Accessories",
      description: "Fashion and daily accessories",
      products: 18,
      status: "Inactive",
    },
  ]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleCreate = () => {
    setEditingCategory(null);

    setFormData({
      name: "",
      description: "",
    });

    setShowModal(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);

    setFormData({
      name: category.name,
      description: category.description,
    });

    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingCategory) {
      setCategories(
        categories.map((category) =>
          category.id === editingCategory.id
            ? {
                ...category,
                name: formData.name,
                description: formData.description,
              }
            : category,
        ),
      );
    } else {
      setCategories([
        ...categories,
        {
          id: Date.now(),
          name: formData.name,
          description: formData.description,
          products: 0,
          status: "Active",
        },
      ]);
    }

    setShowModal(false);
  };

  const handleDelete = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  return (
    <div className="container-fluid bg-light min-vh-100 p-4">
      {/* Header */}

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

      {/* Stats */}

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <small className="text-muted">Total Categories</small>

              <h3 className="fw-bold mb-0">{categories.length}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <small className="text-muted">Active</small>

              <h3 className="fw-bold text-success mb-0">
                {
                  categories.filter((category) => category.status === "Active")
                    .length
                }
              </h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <small className="text-muted">Total Products</small>

              <h3 className="fw-bold mb-0">
                {categories.reduce(
                  (total, category) => total + category.products,
                  0,
                )}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Main Card */}

      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-header bg-white border-0 p-4">
          <div className="input-group">
            <span className="input-group-text bg-light border-0">
              <Search size={18} />
            </span>

            <input
              className="form-control bg-light border-0"
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4">Category</th>
                <th>Description</th>
                <th>Products</th>
                <th>Status</th>
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCategories.map((category) => (
                <tr key={category.id}>
                  <td className="ps-4">
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-primary bg-opacity-10 p-2 rounded-3">
                        <Folder size={20} className="text-primary" />
                      </div>

                      <strong>{category.name}</strong>
                    </div>
                  </td>

                  <td className="text-muted">{category.description}</td>

                  <td>{category.products}</td>

                  <td>
                    <span
                      className={`badge rounded-pill px-3 py-2 ${
                        category.status === "Active"
                          ? "bg-success-subtle text-success"
                          : "bg-secondary-subtle text-secondary"
                      }`}
                    >
                      {category.status}
                    </span>
                  </td>

                  <td className="text-end pe-4">
                    <button
                      className="btn btn-sm btn-light me-2"
                      onClick={() => handleEdit(category)}
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      className="btn btn-sm btn-light text-danger"
                      onClick={() => handleDelete(category.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}

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
    </div>
  );
}
