import { Heart, Eye, Star, ShoppingCart } from "lucide-react";
import "../styles/ProductCard.css";
import { useEffect, useState } from "react";
import useWishlist from "../../Wishlist/Hooks/useWishlist";
import { useAuthStore } from "../../auth/store/auth.store";
import useCartStore from "../../Cart/store/Cart.store";

function ProductCard({ product, callback, isactive }) {
  const { handleAddToWishlist, handleRemoveFromWishlist } = useWishlist();
  const { user } = useAuthStore();
  const { addProductToCart } = useCartStore();
  const stars = [1, 2, 3, 4, 5];

  const {
    name,
 
    price,
    stock,
    category,
    image,
    rating,
    review_count,
 
  } = product;
  const [active, setActive] = useState(Number(isactive) === 1); /*
   * Keep local active state synchronized
   * with the value coming from backend.
   */
  useEffect(() => {
    const wishlistStatus = Number(isactive) === 1;

    setActive(wishlistStatus);
  }, [isactive, product?.p_id]);

 

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

  const handleAddToCart = async () => {
  if (!product?.p_id) {
    console.log("Product ID is missing");
    return;
  }

  await addProductToCart({
    product_id: product.p_id,
    quantity: 1,
    user_id: user?.id,
  });
};

  return (
    <article className="product-card">
      {/* Product Image */}
      <div className="product-image-wrapper">
 
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
          <button
            type="button"
            onClick={handleAddToCart}
            className="action-btn"
            aria-label="Quick view"
          >
            <ShoppingCart size={18} />
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
 

          {price && (
            <span className="text-danger fw-bolder">${Number(price).toFixed(2)}</span>
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
