import {
  Search,
  ShoppingCart,
  Package,
  Truck,
  CreditCard,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useChangeTitle } from "./../../../shared/Utils/useChangeTitle";
import { useMyOrders } from "../Hooks/useMyOrders";

export default function MyOrders() {
  useChangeTitle({ title: "My orders" });

  const Navigate = useNavigate();

  const {
    search,
    orders,
    currentOrders,
    currentPage,
    totalPage,
    startIndex,
    endIndex,
    handlePrevious,
    handleNext,
    handlePageChange,
    handleSearchChange,
    clearSearch,
  } = useMyOrders();
  return (
    <div className="bg-light min-vh-100">
      <div className="container py-4">
        <div className="row g-4">
          <div className="col-lg">
            {/* ================= HEADER ================= */}
            <div className="bg-white p-3 p-md-4 mb-4 shadow-sm">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                <div>
                  <h4 className="fw-bold mb-1">
                    <span className="text-danger me-2">▌</span>
                    My Orders
                  </h4>

                  <p className="text-secondary small mb-0">
                    Track, view, and manage your recent purchases and orders.
                  </p>
                </div>

                <div className="d-flex flex-wrap gap-2">
                  <button className="btn btn-light btn-sm">
                    <Package size={14} className="me-1" />
                    Track Order
                  </button>

                  <button
                    onClick={() => Navigate("/products/")}
                    className="btn btn-danger btn-sm"
                  >
                    <ShoppingCart size={14} className="me-1" />
                    Shop Now
                  </button>
                </div>
              </div>
            </div>

            {/* ================= SEARCH ================= */}
            <div className="bg-white p-3 mb-4 shadow-sm">
              <div className="input-group">
                <span className="input-group-text bg-light border-0">
                  <Search size={16} />
                </span>

                <input
                  type="text"
                  value={search}
                  onChange={handleSearchChange}
                  className="form-control bg-light border-0"
                  placeholder="Search by product name..."
                />

                {search && (
                  <button
                    type="button"
                    className="btn btn-light border-0"
                    onClick={clearSearch}
                  >
                    ×
                  </button>
                )}
              </div>

              {/* ================= FILTERS ================= */}
              <div className="d-flex gap-2 mt-3 flex-wrap">
                <button className="btn btn-danger btn-sm rounded-pill px-3">
                  All Orders
                </button>

                <button className="btn btn-light btn-sm rounded-pill px-3">
                  Processing
                </button>

                <button className="btn btn-light btn-sm rounded-pill px-3">
                  Shipped
                </button>

                <button className="btn btn-light btn-sm rounded-pill px-3">
                  Delivered
                </button>

                <button className="btn btn-light btn-sm rounded-pill px-3">
                  Cancelled
                </button>
              </div>
            </div>

            {/* ================= SEARCH RESULT ================= */}
            {search.trim() !== "" && (
              <div className="mb-3">
                <small className="text-secondary">
                  Search results for{" "}
                  <strong className="text-dark">"{search}"</strong> (
                  {orders.length} {orders.length === 1 ? "order" : "orders"})
                </small>
              </div>
            )}

            {/* ================= ORDERS ================= */}
            {currentOrders.length > 0 ? (
              currentOrders.map((order) => (
                <div className="border-0 shadow-sm mb-4" key={order.order_id}>
                  {/* ================= ORDER HEADER ================= */}

                  <div className="bg-white py-3 px-3">
                    <div className="d-flex flex-wrap bg-body  gap-2">
                      <button className="btn btn-outline-danger btn-sm">
                        <Truck size={14} className="me-1" />
                        Track Order
                      </button>

                      <button
                        onClick={() =>
                          Navigate(`/myOrders/orderDetials/${order.order_id}`)
                        }
                        className="btn btn-outline-danger btn-sm"
                      >
                        View Details
                      </button>
                    </div>
                    <div className="row g-3">
                      <div className="col-6 col-md-3">
                        <small className="text-secondary d-block">
                          ORDER PLACED
                        </small>

                        <div className="fw-semibold small">
                          {new Date(order.created_at).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </div>
                      </div>

                      <div className="col-6 col-md-3">
                        <small className="text-secondary d-block">TOTAL</small>

                        <h6 className="fw-semibold text-danger mb-0">
                          {order.total_sum} EGP
                        </h6>
                      </div>

                      <div className="col-6 col-md-3">
                        <small className="text-secondary d-block">ITEMS</small>

                        <div className="fw-semibold small">
                          {order.products?.length || 0}{" "}
                          {order.products?.length === 1 ? "Item" : "Items"}
                        </div>
                      </div>

                      <div className="col-6 col-md-3 text-md-end">
                        <small className="text-secondary d-block">
                          ORDER #{order.order_id}
                        </small>

                        <span className="badge bg-warning-subtle text-warning-emphasis text-capitalize">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ================= ORDER BODY ================= */}
                  <div className="bg-white p-3">
                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-3">
                      <span className="small text-success fw-semibold">
                        ● Expected delivery
                      </span>

                      <span className="small text-secondary">
                        {new Date(order.arrive_at).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    {/* ================= PRODUCTS ================= */}
                    {order.products?.map((product, index) => (
                      <div
                        key={`${order.order_id}-${product.product_id}-${index}`}
                        className={`row align-items-center g-3 ${
                          index !== order.products.length - 1
                            ? "border-bottom pb-3 mb-3"
                            : ""
                        }`}
                      >
                        <div className="col-auto">
                          <div
                            className="bg-light rounded d-flex align-items-center justify-content-center overflow-hidden"
                            style={{
                              width: "80px",
                              height: "80px",
                            }}
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="img-fluid"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                              }}
                            />
                          </div>
                        </div>

                        <div className="col">
                          <h6 className="mb-1 fw-semibold">{product.name}</h6>

                          <div className="text-danger fw-semibold mt-1">
                            {product.price} EGP
                          </div>

                          {product.old_price > product.price && (
                            <small className="text-secondary text-decoration-line-through">
                              {product.old_price} EGP
                            </small>
                          )}
                        </div>

                        <div className="col-12 col-sm-auto text-sm-end">
                          <small className="text-secondary fw-semibold">
                            Quantity: {product.quantity}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* ================= ORDER FOOTER ================= */}
                  <div className="bg-white p-3 border-top">
                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
                      <small className="text-secondary">
                        Order total:{" "}
                        <strong className="text-danger">
                          {order.total_sum} EGP
                        </strong>
                      </small>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white shadow-sm p-5 text-center">
                <Search size={45} className="text-secondary mb-3" />

                <h5 className="fw-bold">No orders found</h5>

                <p className="text-secondary mb-0">
                  {search.trim()
                    ? `No orders contain a product matching "${search}".`
                    : "You don't have any orders yet."}
                </p>
              </div>
            )}

            {/* ================= PAGINATION ================= */}
            {totalPage > 0 && (
              <div className="bg-white p-3 mb-4 shadow-sm">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                  <small className="text-secondary">
                    Showing <strong>{startIndex + 1}</strong> -{" "}
                    <strong>{Math.min(endIndex, orders.length)}</strong> of{" "}
                    <strong>{orders.length}</strong> orders
                  </small>

                  <div className="d-flex gap-1 flex-wrap justify-content-center">
                    <button
                      onClick={handlePrevious}
                      disabled={currentPage === 1}
                      className="btn btn-light btn-sm"
                    >
                      <ChevronLeft size={16} />
                    </button>

                    {Array.from(
                      { length: totalPage },
                      (_, index) => index + 1,
                    ).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`btn btn-sm ${
                          currentPage === page ? "btn-danger" : "btn-light"
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={handleNext}
                      disabled={currentPage === totalPage}
                      className="btn btn-light btn-sm"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ================= BOTTOM FEATURES ================= */}
            <div className="row g-3 pb-5">
              <div className="col-12 col-md-4">
                <div className="bg-white p-3 d-flex align-items-center h-100">
                  <div className="bg-danger-subtle rounded-circle p-2 me-3 flex-shrink-0">
                    <Package size={20} className="text-danger" />
                  </div>

                  <div>
                    <h6 className="mb-1">Free & Fast Delivery</h6>

                    <small className="text-secondary">
                      Free delivery over $100
                    </small>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="bg-white p-3 d-flex align-items-center h-100">
                  <div className="bg-danger-subtle rounded-circle p-2 me-3 flex-shrink-0">
                    <CreditCard size={20} className="text-danger" />
                  </div>

                  <div>
                    <h6 className="mb-1">Secure Payments</h6>

                    <small className="text-secondary">
                      Safe & secure payment methods
                    </small>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="bg-white p-3 d-flex align-items-center h-100">
                  <div className="bg-danger-subtle rounded-circle p-2 me-3 flex-shrink-0">
                    <Truck size={20} className="text-danger" />
                  </div>
                  <div>
                    <h6 className="mb-1">Easy Returns</h6>

                    <small className="text-secondary">
                      30 day return policy
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
