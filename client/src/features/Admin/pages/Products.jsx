import React, { useState } from "react";
import { Search, Plus, Pencil, Trash2, Eye, Package, X } from "lucide-react";

export default function Products() {
  // Temporary static data
  // Replace this later with products from your Zustand store
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      price: 120,
      stock: 25,
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300",
    },
    {
      id: 2,
      name: "Smart Watch",
      category: "Electronics",
      price: 180,
      stock: 12,
      rating: 4.2,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300",
    },
    {
      id: 3,
      name: "Running Shoes",
      category: "Shoes",
      price: 95,
      stock: 8,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300",
    },
    {
      id: 4,
      name: "Backpack",
      category: "Accessories",
      price: 65,
      stock: 0,
      rating: 4.1,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300",
    },
  ]);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: "",
  });

  // =========================
  // Search
  // =========================

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  // =========================
  // Open Create Modal
  // =========================

  const handleCreate = () => {
    setEditingProduct(null);

    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
      image: "",
    });

    setShowModal(true);
  };

  // =========================
  // Open Edit Modal
  // =========================

  const handleEdit = (product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      image: product.image,
    });

    setShowModal(true);
  };

  // =========================
  // Form Change
  // =========================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // Create / Update
  // =========================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingProduct) {
      // UPDATE

      setProducts(
        products.map((product) =>
          product.id === editingProduct.id
            ? {
                ...product,
                ...formData,
                price: Number(formData.price),
                stock: Number(formData.stock),
              }
            : product,
        ),
      );
    } else {
      // CREATE

      const newProduct = {
        id: Date.now(),
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        stock: Number(formData.stock),
        rating: 0,
        image:
          formData.image || "https://via.placeholder.com/300x300?text=Product",
      };

      setProducts([...products, newProduct]);
    }

    setShowModal(false);
  };

  // =========================
  // Delete
  // =========================

  const handleDelete = () => {
    setProducts(
      products.filter((product) => product.id !== selectedProduct.id),
    );

    setShowDeleteModal(false);
    setSelectedProduct(null);
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

        <button
          className="btn btn-dark d-flex align-items-center gap-2 px-3"
          onClick={handleCreate}
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* ================= STATISTICS ================= */}

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body d-flex align-items-center">
              <div className="bg-primary bg-opacity-10 rounded-3 p-3 me-3">
                <Package size={24} className="text-primary" />
              </div>

              <div>
                <small className="text-muted">Total Products</small>

                <h4 className="fw-bold mb-0">{products.length}</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body">
              <small className="text-muted">In Stock</small>

              <h4 className="fw-bold mb-0 text-success">
                {products.filter((p) => p.stock > 0).length}
              </h4>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body">
              <small className="text-muted">Out of Stock</small>

              <h4 className="fw-bold mb-0 text-danger">
                {products.filter((p) => p.stock === 0).length}
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* ================= PRODUCTS CARD ================= */}

      <div className="card border-0 shadow-sm rounded-4">
        {/* Search */}

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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <span className="text-muted small">
                Showing {filteredProducts.length} products
              </span>
            </div>
          </div>
        </div>

        {/* ================= TABLE ================= */}

        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4">Product</th>

                <th>Category</th>

                <th>Price</th>

                <th>Stock</th>

                <th>Rating</th>

                <th>Status</th>

                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-5 text-muted">
                    No products found
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id}>
                    {/* Product */}

                    <td className="ps-4">
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          width="55"
                          height="55"
                          className="rounded-3 object-fit-cover"
                        />

                        <div>
                          <div className="fw-semibold">{product.name}</div>

                          <small className="text-muted">#{product.id}</small>
                        </div>
                      </div>
                    </td>

                    {/* Category */}

                    <td>
                      <span className="badge bg-light text-dark border">
                        {product.category}
                      </span>
                    </td>

                    {/* Price */}

                    <td>
                      <span className="fw-semibold">${product.price}</span>
                    </td>

                    {/* Stock */}

                    <td>{product.stock}</td>

                    {/* Rating */}

                    <td>
                      <span className="fw-semibold">⭐ {product.rating}</span>
                    </td>

                    {/* Status */}

                    <td>
                      {product.stock > 0 ? (
                        <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">
                          In Stock
                        </span>
                      ) : (
                        <span className="badge bg-danger-subtle text-danger rounded-pill px-3 py-2">
                          Out of Stock
                        </span>
                      )}
                    </td>

                    {/* Actions */}

                    <td className="text-end pe-4">
                      <div className="d-flex justify-content-end gap-2">
                        {/* View */}

                        <button className="btn btn-sm btn-light" title="View">
                          <Eye size={16} />
                        </button>

                        {/* Edit */}

                        <button
                          className="btn btn-sm btn-light"
                          title="Edit"
                          onClick={() => handleEdit(product)}
                        >
                          <Pencil size={16} />
                        </button>

                        {/* Delete */}

                        <button
                          className="btn btn-sm btn-light text-danger"
                          title="Delete"
                          onClick={() => {
                            setSelectedProduct(product);
                            setShowDeleteModal(true);
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================================================= */}
      {/* CREATE / UPDATE MODAL */}
      {/* ================================================= */}

      {showModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow rounded-4">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">
                  {editingProduct ? "Update Product" : "Create Product"}
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
                  {/* Product Name */}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Product Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter product name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Category */}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Category</label>

                    <select
                      name="category"
                      className="form-select"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select category</option>

                      <option value="Electronics">Electronics</option>

                      <option value="Shoes">Shoes</option>

                      <option value="Accessories">Accessories</option>

                      <option value="Clothing">Clothing</option>
                    </select>
                  </div>

                  <div className="row">
                    {/* Price */}

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Price</label>

                      <input
                        type="number"
                        name="price"
                        className="form-control"
                        placeholder="0"
                        value={formData.price}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Stock */}

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Stock</label>

                      <input
                        type="number"
                        name="stock"
                        className="form-control"
                        placeholder="0"
                        value={formData.stock}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Image */}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Product Image URL
                    </label>

                    <input
                      type="text"
                      name="image"
                      className="form-control"
                      placeholder="https://..."
                      value={formData.image}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="modal-footer border-0">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>

                  <button type="submit" className="btn btn-dark px-4">
                    {editingProduct ? "Update Product" : "Create Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* DELETE MODAL */}
      {/* ================================================= */}

      {showDeleteModal && (
        <div
          className="modal d-block"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow rounded-4">
              <div className="modal-body text-center p-5">
                <div className="bg-danger bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                  <Trash2 size={28} className="text-danger" />
                </div>

                <h5 className="fw-bold">Delete Product?</h5>

                <p className="text-muted">
                  Are you sure you want to delete{" "}
                  <strong>{selectedProduct?.name}</strong>
                  ?
                  <br />
                  This action cannot be undone.
                </p>

                <div className="d-flex justify-content-center gap-2">
                  <button
                    className="btn btn-light px-4"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>

                  <button
                    className="btn btn-danger px-4"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
