import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Star } from "lucide-react";
import { useProducts } from "./../hooks/useProductStore";

import ProductComments from "./../component/ProductReviews";
import useProductdetails from "../hooks/useProductdetails";
import { FetchOnRender } from "./../../../shared/Utils/useFetch";

export default function Productdetails() {
  const {
    product,
    id,
    stars,
    selectedImage,
    setSelectedImage,
    getProduct,
    discountPercentage,
    currentRating,
    maxQuantity,
    isExist,
  } = useProductdetails();

  FetchOnRender(() => getProduct(), id);

  isExist();

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
                src={selectedImage || product?.image}
                alt={product?.name}
                className="w-100 h-100"
                style={{
                  objectFit: "contain",
                }}
              />
            </div>

            <div className="d-flex gap-3 mt-3">
              <button
                type="button"
                onClick={() => setSelectedImage(product?.image)}
                className={`p-0 bg-white rounded ${
                  selectedImage === product?.image
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
                  src={product?.image}
                  alt={`${product?.name} thumbnail`}
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
          <p className="text-muted mb-2">{product?.category}</p>

          <h1 className="display-6 fw-bold mb-3">{product?.name}</h1>

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

            <span className="text-muted">
              ({product?.review_count} reviews)
            </span>
          </div>

          <div className="d-flex align-items-center flex-wrap gap-3 mb-4">
            <span className="fs-2 fw-bold">
              ${Number(product?.price_after_discount).toFixed(2)}
            </span>

            {product?.price && (
              <span className="fs-5 text-muted text-decoration-line-through">
                ${Number(product?.price).toFixed(2)}
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

            <p className="text-secondary">{product?.category}</p>
          </div>

          <div className="mb-4">
            {product?.stock > 0 ? (
              <div className="text-success fw-semibold">
                ✓ In stock
                <span className="text-muted fw-normal ms-2">
                  ({product?.stock} available)
                </span>
              </div>
            ) : (
              <div className="text-danger fw-semibold">✕ Out of stock</div>
            )}
          </div>

          {product?.stock > 0 && (
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
              className="btn btn-danger btn-lg flex-grow-1"
              disabled={product?.stock <= 0}
              onClick={() => {
                console.log("Add to cart:", product?.p_id);
              }}
            >
              {product?.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>

            
          </div>
        </div>
      </div>

      <section className="mt-1 pt-1 border-top  border-2">
        <ProductComments productId={product?.p_id} />
      </section>
    </div>
  );
}
