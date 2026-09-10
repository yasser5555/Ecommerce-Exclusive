import React from "react";
import { ShoppingCart, Heart } from "lucide-react";

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
      console.log(
        `1. WishlistCard: add to cart clicked for product ${product.p_id}`,
      );

      onAddToCart(product);

      console.log(
        `2. WishlistCard: addToCart function called for product ${product.p_id}`,
      );

      console.log("3. WishlistCard: waiting for cart operation");

      console.log(
        `4. WishlistCard: add to cart operation finished for product ${product.p_id}`,
      );
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
                <span className="fw-semibold me-2">
                  ${finalPrice.toFixed(2)}
                </span>

                {hasDiscount && (
                  <small className="text-secondary text-decoration-line-through">
                    ${Number(product.price).toFixed(2)}
                  </small>
                )}
              </div>

              {/* Rating */}
              <small className="text-secondary">
                ★ {product.rating} ({product.review_count} reviews)
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
            <button
              onClick={addToCart}
              className="btn btn-dark btn-sm w-100 d-flex align-items-center justify-content-center gap-1"
            >
              <ShoppingCart size={14} />
              Add to Cart
            </button>
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
