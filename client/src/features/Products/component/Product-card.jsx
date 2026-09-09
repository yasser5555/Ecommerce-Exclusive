import { Heart, Eye, Star } from "lucide-react";
import "../styles/ProductCard.css";
import { useState } from "react";

function ProductCard({ product, callback }) {
  const stars = [1, 2, 3, 4, 5]
  const [active, setActive] = useState(false);
  const {
    name,
    price_after_discount,
    price,
    stock,
    category,
    image,
    rating,
    review_count,
  } = product;

  // Calculate discount percentage
  const discountPercentage =
    price && price_after_discount
      ? Math.round(
          ((Number(price) - Number(price_after_discount)) / Number(price)) *
            100,
        )
      : 0;

  return (
    <article className="product-card">
      {/* Product Image */}
      <div className="product-image-wrapper">
        {/* Sale Badge - only appears if there is a discount */}
        {discountPercentage > 0 && (
          <span className="sale-badge">-{discountPercentage}%</span>
        )}

        {/* Action Buttons */}
        <div className="product-actions">
          <button
            type="button"
            className="action-btn"
            aria-label="Add to wishlist"
          >
            <Heart
              className={active ? "text-danger" : ""}
              fill={active ? "currentColor" : "none"}
              onClick={() => setActive(!active)}
              size={18}
            />
          </button>

          <button type="button" onClick={callback} className="action-btn" aria-label="Quick view">
            <Eye  size={18} />
          </button>
        </div>

        <img src={image} alt={name} className="product-image" loading="lazy" />
      </div>

      {/* Product Information */}
      <div className="product-info">
        <h3 className="product-name" name={name}>
          {name}
        </h3>
        <h5 className="product-name" name={category}>
          {category}
        </h5>

        {/* Price */}
        <div className="product-price">
          <span className="current-price">
            ${Number(price_after_discount).toFixed(2)}
          </span>

          {price && (
            <span className="old-price">${Number(price).toFixed(2)}</span>
          )}
        </div>

        {/* Rating */}
        <div className="product-rating d-flex">
          <div className="stars">
            {stars.map((star) => {
              // Get Rating
              const Rating = Number(rating);

              let fillPercentage = 0;

              if (Rating >= star) {
                fillPercentage = 100;
              } else if (Rating > star - 1) {
                fillPercentage = (Rating - (star - 1)) * 100;
              }
              return (
                <div className="star-wrapper" key={star}>
                  {/* Empty star */}
                  <Star size={16} className="star-empty" />

                  {/* Colored part */}
                  <div
                    className="star-filled"
                    style={{
                      width: `${fillPercentage}%`,
                    }}
                  >
                    <Star size={16} fill="currentColor" />
                  </div>
                </div>
              );
            })}
          </div>

          <span className="review-count">({review_count})</span>
        </div>

        {/* Stock */}
        <div className="stock-info">
          {stock > 0 ? (
            <span className="in-stock">In stock</span>
          ) : (
            <span className="out-of-stock">Out of stock</span>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
