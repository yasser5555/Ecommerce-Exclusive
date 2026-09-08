import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Star } from "lucide-react";
import { useProducts } from "./../hooks/useProductStore";

export default function Productdetails() {
  const stars = [1, 2, 3, 4, 5];
  const { id } = useParams();
  const { productDetails, getproductDetials, isLoading } = useProducts();
  const [selectedImage, setSelectedImage] = useState("");
  useEffect(() => {
    const getProduct = async () => {
      try {
        await getproductDetials(id);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    getProduct();
  }, [id]);

  // ================= PRODUCT DATA =================

  // The API returns an array
  const product = Array.isArray(productDetails)
    ? productDetails[0]
    : productDetails;

  // ================= NOT FOUND =================

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h2>Product not found</h2>
        <p className="text-muted">
          The product you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  // ================= PRODUCT DATA =================

  const {
    id: productId,
    cat_id: categoryId,
    image,
    name,
    category,
    price,
    price_after_discount,
    stock,
    rating,
    review_count,
  } = product;

  // ================= DISCOUNT =================

  const discountPercentage =
    price && price_after_discount
      ? Math.round(
          ((Number(price) - Number(price_after_discount)) / Number(price)) *
            100,
        )
      : 0;

  // ================= RATING =================

  const currentRating = Number(rating) || 0;

  // ================= QUANTITY =================

  const maxQuantity = Math.min(Number(stock) || 0, 10);

  return (
    <div className="container py-5">
      <div className="row g-5">
        <div className="col-12 col-lg-6">
          <div className="card border-0">
            <div
              className="border rounded overflow-hidden bg-light"
              style={{
                height: "500px",
              }}
            >
              <img
                src={selectedImage || image}
                alt={name}
                className="w-100 h-100"
                style={{
                  objectFit: "contain",
                }}
              />
            </div>

            <div className="d-flex gap-3 mt-3">
              <button
                type="button"
                onClick={() => setSelectedImage(image)}
                className={`p-0 bg-white rounded ${
                  selectedImage === image ? "border border-primary" : "border"
                }`}
                style={{
                  width: "90px",
                  height: "90px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={image}
                  alt={`${name} thumbnail`}
                  className="w-100 h-100"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </button>
            </div>

            <small className="text-muted mt-2">
              Click the image to preview it.
            </small>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          {/* Category */}

          <p className="text-muted mb-2">{category}</p>

          {/* Title */}

          <h1 className="display-6 fw-bold mb-3">{name}</h1>

          {/* Product ID */}
          <p className="text-muted mb-3">Product ID: #{productId}</p>
          <div className="d-flex align-items-center gap-2 mb-4">
            <div className="d-flex align-items-center">
              {stars.map((star) => {
                let fillPercentage = 0;
                if (currentRating >= star) {
                  fillPercentage = 100;
                } else if (currentRating > star - 1) {
                  fillPercentage = (currentRating - (star - 1)) * 100;
                }
                return (
                  <div
                    key={star}
                    style={{
                      position: "relative",
                      width: "18px",
                      height: "18px",
                    }}
                  >
                    {/* Empty Star */}
                    <Star
                      size={18}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        color: "#d1d5db",
                      }}
                    />

                    {/* Filled Part */}

                    <div
                      style={{
                        position: "absolute",
                        top: "-30%",
                        left: 0,
                        width: `${fillPercentage}%`,
                        // height: "18px",
                        overflow: "hidden",
                        color: "#fbbf24",
                      }}
                    >
                      <Star size={18} fill="currentColor" />
                    </div>
                  </div>
                );
              })}
            </div>

            <span className="fw-semibold">{currentRating.toFixed(1)}</span>

            <span className="text-muted">({review_count} reviews)</span>
          </div>

          <div className="d-flex align-items-center flex-wrap gap-3 mb-4">
            <span className="fs-2 fw-bold">
              ${Number(price_after_discount).toFixed(2)}
            </span>

            {price && (
              <span className="fs-5 text-muted text-decoration-line-through">
                ${Number(price).toFixed(2)}
              </span>
            )}

            {discountPercentage > 0 && (
              <span className="badge bg-danger fs-6">
                -{discountPercentage}%
              </span>
            )}
          </div>

          <div className="mb-4">
            <h5 className="fw-bold">Category</h5>

            <p className="text-secondary">{category}</p>
          </div>

          <div className="mb-4">
            {stock > 0 ? (
              <div className="text-success fw-semibold">
                ✓ In stock
                <span className="text-muted fw-normal ms-2">
                  ({stock} available)
                </span>
              </div>
            ) : (
              <div className="text-danger fw-semibold">✕ Out of stock</div>
            )}
          </div>

          {stock > 0 && (
            <div className="mb-4">
              <label htmlFor="quantity" className="form-label fw-semibold">
                Quantity
              </label>

              <select
                id="quantity"
                className="form-select"
                style={{
                  maxWidth: "150px",
                }}
                defaultValue="1"
              >
                {Array.from(
                  { length: maxQuantity },
                  (_, index) => index + 1,
                ).map((quantity) => (
                  <option key={quantity} value={quantity}>
                    {quantity}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="d-flex flex-column flex-sm-row gap-3 mb-4">
            <button
              type="button"
              className="btn btn-primary btn-lg flex-grow-1"
              disabled={stock <= 0}
              onClick={() => {
                console.log("Add to cart:", productId);
              }}
            >
              {stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>

            <button
              type="button"
              className="btn btn-outline-danger btn-lg"
              onClick={() => {
                console.log("Add to wishlist:", productId);
              }}
            >
              ♡ Wishlist
            </button>
          </div>

          <div className="border rounded p-4">
            <h5 className="fw-bold mb-3">Product Information</h5>

            <div className="row g-3">
              {/* ID */}

              <div className="col-12 col-sm-6">
                <small className="text-muted d-block">Product ID</small>

                <span className="fw-semibold">#{productId}</span>
              </div>

              {/* Category ID */}

              <div className="col-12 col-sm-6">
                <small className="text-muted d-block">Category ID</small>

                <span className="fw-semibold">#{categoryId}</span>
              </div>

              {/* Category */}

              <div className="col-12 col-sm-6">
                <small className="text-muted d-block">Category</small>

                <span className="fw-semibold">{category}</span>
              </div>

              {/* Stock */}

              <div className="col-12 col-sm-6">
                <small className="text-muted d-block">Stock</small>

                <span className="fw-semibold">{stock}</span>
              </div>

              {/* Rating */}

              <div className="col-12 col-sm-6">
                <small className="text-muted d-block">Rating</small>

                <span className="fw-semibold">
                  {currentRating.toFixed(1)} / 5
                </span>
              </div>

              {/* Reviews */}

              <div className="col-12 col-sm-6">
                <small className="text-muted d-block">Reviews</small>

                <span className="fw-semibold">{review_count}</span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="d-flex align-items-center mb-3">
              <span className="me-3 fs-4">🚚</span>

              <div>
                <strong>Fast Delivery</strong>

                <small className="d-block text-muted">
                  Fast and reliable shipping
                </small>
              </div>
            </div>

            <div className="d-flex align-items-center mb-3">
              <span className="me-3 fs-4">↩️</span>

              <div>
                <strong>Easy Returns</strong>

                <small className="d-block text-muted">
                  Simple return process
                </small>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <span className="me-3 fs-4">🔒</span>

              <div>
                <strong>Secure Payment</strong>

                <small className="d-block text-muted">
                  Your payment is secure
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-5 pt-5 border-top">
        <h2 className="h3 fw-bold mb-2">Customer Reviews</h2>

        <p className="text-muted">{review_count} customer reviews</p>
      </section>
    </div>
  );
}
