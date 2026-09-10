import { Heart, Eye, Star } from "lucide-react";
import "../styles/ProductCard.css";
import { useEffect, useState } from "react";
import useWishlist from "../../Wishlist/Hooks/useWishlist";

function ProductCard({ product, callback, isactive }) {
  const { handleAddToWishlist, handleRemoveFromWishlist } = useWishlist();

  const stars = [1, 2, 3, 4, 5];

  const {
    name,
    price_after_discount,
    price,
    stock,
    category,
    image,
    rating,
    review_count,
    isWishList,
  } = product;
  const [active, setActive] = useState(Number(isactive) === 1); /*
   * Keep local active state synchronized
   * with the value coming from backend.
   */
  useEffect(() => {
    const wishlistStatus = Number(isactive) === 1;

    setActive(wishlistStatus);
  }, [isactive, product?.p_id]);

  // Calculate discount percentage
  const discountPercentage =
    price && price_after_discount
      ? Math.round(
          ((Number(price) - Number(price_after_discount)) / Number(price)) *
            100,
        )
      : 0;

  const handleWishlist = async () => {
    try {
      const newState = !active;
      // active = product?.isWishList
      // Update UI immediately
      setActive(newState);

      if (newState) {
        await handleAddToWishlist(product?.p_id);
      } else {
        await handleRemoveFromWishlist(product?.p_id);
      }
    } catch (error) {
      console.log("4. ProductCard: wishlist operation failed:", error);

      // Roll UI back if API fails
      setActive(active);
    }
  };

  return (
    <article className="product-card">
      {/* Product Image */}
      <div className="product-image-wrapper">
        {/* Sale Badge */}
        {discountPercentage > 0 && (
          <span className="sale-badge">-{discountPercentage}%</span>
        )}

        {/* Action Buttons */}
        <div className="product-actions">
          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            type="button"
            className="action-btn"
            aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
          >
           <Heart
  className={active ? "text-danger" : ""}
  fill={active ? "currentColor" : "none"}
  size={18}
/>
          </button>

          {/* Quick View */}
          <button
            type="button"
            onClick={callback}
            className="action-btn"
            aria-label="Quick view"
          >
            <Eye size={18} />
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
              const Rating = Number(rating);

              let fillPercentage = 0;

              if (Rating >= star) {
                fillPercentage = 100;
              } else if (Rating > star - 1) {
                fillPercentage = (Rating - (star - 1)) * 100;
              }

              return (
                <div className="star-wrapper" key={star}>
                  <Star size={16} className="star-empty" />

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
