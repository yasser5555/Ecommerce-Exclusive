import { Heart, Eye, Star } from "lucide-react";
import "../styles/ProductCard.css";

function ProductCard({ product, callback } ) {
  const {
    name,
    Discount_price,
    old_price,
    stock,
    product_image,
  } = product;

  // Calculate discount percentage
  const discountPercentage =
    old_price && Discount_price
      ? Math.round(
          ((Number(old_price) - Number(Discount_price)) /
            Number(old_price)) *
            100
        )
      : 0;

  return (
    <article onClick={callback} className="product-card">
      {/* Product Image */}
      <div className="product-image-wrapper">
        {/* Sale Badge - only appears if there is a discount */}
        {discountPercentage > 0 && (
          <span className="sale-badge">
            -{discountPercentage}%
          </span>
        )}

        {/* Action Buttons */}
        <div className="product-actions">
          <button
            type="button"
            className="action-btn"
            aria-label="Add to wishlist"
          >
            <Heart size={18} />
          </button>

          <button
            type="button"
            className="action-btn"
            aria-label="Quick view"
          >
            <Eye size={18} />
          </button>
        </div>

        <img
          src={product_image}
          alt={name}
          className="product-image"
          loading="lazy"
        />
      </div>

      {/* Product Information */}
      <div className="product-info">
        <h3 className="product-name" name={name}>
          {name}
        </h3>

        {/* Price */}
        <div className="product-price">
          <span className="current-price">
            ${Number(Discount_price).toFixed(2)}
          </span>

          {old_price && (
            <span className="old-price">
              ${Number(old_price).toFixed(2)}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="product-rating">
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={16}
                fill="currentColor"
              />
            ))}
          </div>

          <span className="review-count">
            (0)
          </span>
        </div>

        {/* Stock */}
        <div className="stock-info">
          {stock > 0 ? (
            <span className="in-stock">
              In stock
            </span>
          ) : (
            <span className="out-of-stock">
              Out of stock
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProductCard;