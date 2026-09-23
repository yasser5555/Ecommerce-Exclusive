import React, { useState } from "react";
import { Star } from "lucide-react";

import ProductComments from "./../component/ProductReviews";
import useProductdetails from "../hooks/useProductdetails";
import { FetchOnRender } from "../../../shared/Utils/useFetch";
import useCartStore from "../../Cart/store/Cart.store";
import { useAuthStore } from "../../auth/store/auth.store";
import { useChangeTitle } from "../../../shared/Utils/useChangeTitle";
import { toast } from "react-toastify";

export default function Productdetails() {
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuthStore();
  const { addProductToCart, cart } = useCartStore();

  const {
    product,
    id,
    stars,
    selectedImage,
    getProduct,
    discountPercentage,
    currentRating,
    maxQuantity,
    isExist,
  } = useProductdetails();

  FetchOnRender(() => getProduct(), id);

  isExist();

  const handleAddToCart = async () => {
    // ! Check if the product already exists in the user's cart
    const existingProduct = cart.find(
      (item) => Number(item.product_id) === Number(product.p_id),
    );

    // ! If the product already exists, show a message and stop
    if (existingProduct) {
      toast.info("Product Already Added to your Cart");
      return;
    }

    await addProductToCart({
      product_id: product.p_id,
      quantity: quantity,
      user_id: user?.id,
    });
  };
  useChangeTitle({ title: `${product?.name}` });
  return (
    <div className="container py-5">
      <div className="row g-5">
        {/* ================= IMAGE ================= */}
        <div className="col-12 col-lg-6">
          <div className="card border-0">
            <div
              className="border rounded overflow-hidden bg-light"
              style={{
                height: "90dvh",
              }}
            >
              <img
                src={selectedImage || product?.image}
                alt={product?.name || "Product"}
                className="w-100 h-100"
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        </div>

        {/* ================= PRODUCT INFO ================= */}
        <div className="col-12 col-lg-6">
          {/* Category */}
          <p className="text-muted mb-2">{product?.category}</p>

          {/* Name */}
          <h1 className="display-6 fw-bold mb-3">{product?.name}</h1>

          {/* ================= RATING ================= */}
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

                    {/* Filled Star */}
                    <div
                      style={{
                        position: "absolute",
                        top: "-30%",
                        left: 0,
                        width: `${fillPercentage}%`,
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

            <span className="fw-semibold">
              {Number(currentRating).toFixed(1)}
            </span>

            <span className="text-muted">
              ({product?.review_count || 0} reviews)
            </span>
          </div>

          {/* ================= PRICE ================= */}
          <div className="d-flex align-items-center flex-wrap gap-3 mb-4">
            {product?.price && (
              <span className="fs-5 text-danger fw-bolder">
                ${Number(product.price).toFixed(2)}
              </span>
            )}

            {discountPercentage > 0 && (
              <span className="badge bg-danger fs-6">
                -{discountPercentage}%
              </span>
            )}
          </div>

          {/* ================= DESCRIPTION ================= */}
          <p className="text-black text-sm md:text-base leading-7 max-w-3xl">
            {product?.description}
          </p>

          {/* ================= CATEGORY ================= */}
          <div className="mb-4">
            <h5 className="fw-bold">Category</h5>

            <p className="text-secondary">{product?.category}</p>
          </div>

          {/* ================= STOCK ================= */}
          <div className="mb-4">
            {product?.stock > 0 ? (
              <div className="text-success fw-semibold">
                ✓ In stock
                <span className="text-muted fw-normal ms-2">
                  ({product.stock} available)
                </span>
              </div>
            ) : (
              <div className="text-danger fw-semibold">✕ Out of stock</div>
            )}
          </div>

          {/* ================= QUANTITY ================= */}
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
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              >
                {Array.from(
                  {
                    length: maxQuantity,
                  },
                  (_, index) => index + 1,
                ).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* ================= ADD TO CART ================= */}
          <div className="d-flex flex-column flex-sm-row gap-3 mb-4">
            <button
              type="button"
              className="btn btn-danger btn-lg flex-grow-1"
              disabled={product?.stock <= 0}
              onClick={handleAddToCart}
            >
              {product?.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>

      {/* ================= REVIEWS ================= */}
      <section className="mt-1 pt-1">
        <ProductComments productId={product?.p_id} />
      </section>
    </div>
  );
}
