import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductsStore } from "./../hooks/useProductStore";

export default function Productdetails() {
  const { id } = useParams();

  const { productDetails, getproductDetials, isLoading } = useProductsStore();

  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (!id) return;

    const getProduct = async () => {
      try {
        console.log("Product ID:", id);

        const data = await getproductDetials(id);

        console.log("Fetched product:", data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    getProduct();
  }, [id, getproductDetials]);

  // Set the main image when product data arrives
  useEffect(() => {
    if (productDetails?.product_image) {
      setSelectedImage(productDetails.product_image);
    }
  }, [productDetails]);

  // ================= LOADING =================

  if (isLoading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>

        <p className="mt-3 text-muted">Loading product...</p>
      </div>
    );
  }

  // ================= NOT FOUND =================

  if (!productDetails) {
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
    title,
    description,
    Discount_price,
    old_price,
    stock,
    product_image,
    Added_at,
  } = productDetails;

  // ================= DISCOUNT =================

  const discountPercentage =
    old_price && Discount_price
      ? Math.round(
          ((Number(old_price) - Number(Discount_price)) / Number(old_price)) *
            100,
        )
      : 0;

  // ================= DATE =================

  const addedDate = Added_at
    ? new Date(Added_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown";

  // ================= QUANTITY =================

  const maxQuantity = Math.min(stock, 10);

  return (
    <div className="container py-5">
      {/* =====================================================
          PRODUCT
      ===================================================== */}

      <div className="row g-5">
        {/* =================================================
            PRODUCT IMAGES
        ================================================= */}

        <div className="col-12 col-lg-6">
          <div className="card border-0">
            {/* Main Image */}

            <div
              className="border rounded overflow-hidden bg-light"
              style={{
                height: "500px",
              }}
            >
              <img
                src={selectedImage || product_image}
                alt={title}
                className="w-100 h-100"
                style={{
                  objectFit: "contain",
                }}
              />
            </div>

            {/* Thumbnail */}

            <div className="d-flex gap-3 mt-3">
              <button
                type="button"
                onClick={() => setSelectedImage(product_image)}
                className={`p-0 bg-white rounded ${
                  selectedImage === product_image
                    ? "border border-primary"
                    : "border"
                }`}
                style={{
                  width: "90px",
                  height: "90px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={product_image}
                  alt={`${title} thumbnail`}
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

        {/* =================================================
            PRODUCT INFORMATION
        ================================================= */}

        <div className="col-12 col-lg-6">
          {/* Title */}

          <h1 className="display-6 fw-bold mb-3">{title}</h1>

          {/* Product ID */}

          <p className="text-muted mb-4">Product ID: #{productDetails.id}</p>

          {/* =================================================
              PRICE
          ================================================= */}

          <div className="d-flex align-items-center flex-wrap gap-3 mb-4">
            <span className="fs-2 fw-bold">
              ${Number(Discount_price).toFixed(2)}
            </span>

            {old_price && (
              <span className="fs-5 text-muted text-decoration-line-through">
                ${Number(old_price).toFixed(2)}
              </span>
            )}

            {discountPercentage > 0 && (
              <span className="badge bg-danger fs-6">
                -{discountPercentage}%
              </span>
            )}
          </div>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <div className="mb-4">
            <h5 className="fw-bold">Description</h5>

            <p className="text-secondary lh-lg">{description}</p>
          </div>

          {/* =================================================
              STOCK
          ================================================= */}

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

          {/* =================================================
              QUANTITY
          ================================================= */}

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

          {/* =================================================
              BUTTONS
          ================================================= */}

          <div className="d-flex flex-column flex-sm-row gap-3 mb-4">
            <button
              type="button"
              className="btn btn-primary btn-lg flex-grow-1"
              disabled={stock <= 0}
              onClick={() => {
                console.log("Add to cart:", productDetails.id);
              }}
            >
              {stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>

            <button
              type="button"
              className="btn btn-outline-danger btn-lg"
              onClick={() => {
                console.log("Add to wishlist:", productDetails.id);
              }}
            >
              ♡ Wishlist
            </button>
          </div>

          {/* =================================================
              PRODUCT DETAILS
          ================================================= */}

          <div className="border rounded p-4">
            <h5 className="fw-bold mb-3">Product Information</h5>

            <div className="row g-3">
              {/* ID */}

              <div className="col-12 col-sm-6">
                <small className="text-muted d-block">Product ID</small>

                <span className="fw-semibold">#{productDetails.id}</span>
              </div>

              {/* Category */}

              <div className="col-12 col-sm-6">
                <small className="text-muted d-block">Category ID</small>

                <span className="fw-semibold">
                  #{productDetails.category_id}
                </span>
              </div>

              {/* Stock */}

              <div className="col-12 col-sm-6">
                <small className="text-muted d-block">Stock</small>

                <span className="fw-semibold">{stock}</span>
              </div>

              {/* Added At */}

              <div className="col-12 col-sm-6">
                <small className="text-muted d-block">Added At</small>

                <span className="fw-semibold">{addedDate}</span>
              </div>
            </div>
          </div>

          {/* =================================================
              SHIPPING
          ================================================= */}

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

      {/* =====================================================
          REVIEWS
      ===================================================== */}

      <section className="mt-5 pt-5 border-top">
        <div className="row">
          <div className="col-12">
            <h2 className="h3 fw-bold mb-2">Customer Reviews</h2>

            <p className="text-muted">
              Reviews will appear here once the review system is connected.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
