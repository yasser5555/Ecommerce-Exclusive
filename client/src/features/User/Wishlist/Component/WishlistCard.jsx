import React from "react";
import { ShoppingCart, Heart, Star, Eye } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function WishlistCard({ product, onRemove, onAddToCart }) {
  const removeFromWishlist = () => {
    try {
      onRemove(product.p_id);
    } catch (error) {
      console.log("4. WishlistCard: error while removing product:", error);
    }
  };

  const addToCart = () => {
    try {
      onAddToCart(product);
    } catch (error) {
      console.log(
        "4. WishlistCard: error while adding product to cart:",
        error,
      );
    }
  };

  const hasDiscount =
    Number(product.price_after_discount) > 0 &&
    Number(product.price_after_discount) < Number(product.price);

  const finalPrice = hasDiscount
    ? Number(product.price_after_discount)
    : Number(product.price);

  return (
    <div className="border-bottom p-2 p-md-3">
      <div className="row align-items-center g-3">
        {/* Image */}
        <div className="col-auto">
          <div
            className="bg-light rounded overflow-hidden"
            style={{
              width: "85px",
              height: "85px",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-100 h-100"
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="col">
          <div className="d-flex align-items-start justify-content-between">
            <div>
              {/* Product Name */}
              <h6 className="fw-bold mb-1">{product?.name}</h6>

              {/* Category */}
              <small className="text-secondary d-block mb-1">
                {product?.category}
              </small>

              {/* Price */}
              <div className="mb-1">
                <span className="text-danger fw-semibold me-2">
                  ${finalPrice.toFixed(2)}
                </span>

                {hasDiscount && (
                  <small className="text-secondary text-decoration-line-through">
                    ${Number(product.price).toFixed(2)}
                  </small>
                )}
              </div>

              {/* Rating */}
              <small className="text-warning-emphasis ">
                <Star size={16} fill="currentcolor" /> {product.rating} (
                {product.review_count} reviews)
              </small>
            </div>

            {/* Remove from Wishlist */}
            <button
              onClick={removeFromWishlist}
              className="btn btn-sm p-0 text-secondary"
              title="Remove"
            >
              <Heart className="text-danger" fill="currentColor" size={18} />
            </button>
          </div>
        </div>

        {/* Action */}
        <div className="col-12 col-md-auto">
          {Number(product.stock) > 0 ? (
            <>
              <button
                onClick={addToCart}
                className="btn btn-danger btn-sm w-100 d-flex mb-1 align-items-center justify-content-center gap-1"
              >
                <ShoppingCart size={14} />
                Add to Cart
              </button>
              <NavLink to={`/products/${product.p_id}`}
                onClick={addToCart}
                className="btn btn-danger btn-sm w-100 d-flex align-items-center justify-content-center gap-1"
              >
                <Eye size={14} />
                View Product
              </NavLink>
            </>
          ) : (
            <button disabled className="btn btn-secondary btn-sm w-100">
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
