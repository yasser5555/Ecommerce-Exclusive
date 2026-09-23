import { Heart, Eye, Star, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import useWishlist from "../../Wishlist/Hooks/useWishlist";
import { useAuthStore } from "../../auth/store/auth.store";
import useCartStore from "../../Cart/store/Cart.store";

function ProductCard({ product, callback, isactive }) {
  // ! For Handling User wishList
  const { handleAddToWishlist, handleRemoveFromWishlist } = useWishlist();
  // ! Fetch User id for Product Reviews
  const { user } = useAuthStore();
  const { addProductToCart } = useCartStore();
  // ! For Rating
  const stars = [1, 2, 3, 4, 5];
  // ! For Color Show
  const [active, setActive] = useState(Number(isactive) === 1);
  // ! Re-Rendering Product card with Changes
  useEffect(() => {
    setActive(isactive === 1);
  }, [isactive, product?.p_id]);
  const handleWishlist = async () => {
    try {
      // !  reversing Current State in order to Toggle Product in WishList
      const newState = !active;
      // ! Update State
      setActive(newState);
      // ! newState is true value then add it to wishlist
      if (newState) {
        await handleAddToWishlist(product?.p_id);
      } else {
        // ! otherwise remove it from wishlist
        await handleRemoveFromWishlist(product?.p_id);
      }
    } catch (error) {
      console.log("4. ProductCard: wishlist operation failed:", error);
      setActive(active);
    }
  };

  const handleAddToCart = async () => {
    // ! Sending Added data to store
    await addProductToCart({
      // ! Which product does user added it to his Cart
      product_id: product.p_id,
      // ! can be modifeied but logically 1
      quantity: 1,
      // ! Which user added this product to his Cart
      user_id: user?.id,
    });
  };
  // ! Parsing Rating into Number will be used later on
  const Rating = Number(product?.rating) || 0;
  return (
    <article className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
      {/* Image */}
      <div
        className="position-relative bg-light overflow-hidden"
        style={{ height: "260px" }}
      >
        <img
          src={product?.image}
          alt={product?.name}
          className="w-100 h-100"
          style={{
            objectFit: "contain",
            padding: "25px",
          }}
          loading="lazy"
        />

        {/* Category */}
        <span className="position-absolute top-0 start-0 m-3 badge bg-white text-dark shadow-sm rounded-pill px-3 py-2">
          {product?.category}
        </span>

        {/* Stock */}

        {/* Action Buttons */}
        <div className="position-absolute top-0 end-0 m-3 d-flex flex-column gap-2">
          <button
            type="button"
            onClick={handleWishlist}
            className="btn btn-light rounded-circle shadow-sm d-flex align-items-center justify-content-center p-0"
            style={{ width: "42px", height: "42px" }}
            aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              size={18}
              className={active ? "text-danger" : "text-dark"}
              fill={active ? "currentColor" : "none"}
            />
          </button>

          <button
            type="button"
            onClick={callback}
            className="btn btn-light rounded-circle shadow-sm d-flex align-items-center justify-content-center p-0"
            style={{ width: "42px", height: "42px" }}
            aria-label="Quick view"
          >
            <Eye size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="card-body d-flex flex-column p-4">
        {/* Product Name */}
        <h6
          className="fw-bold mb-2 text-dark"
          style={{
            minHeight: "42px",
          }}
        >
          {product?.name}
        </h6>

        {/* Rating */}
        <div className="d-flex  align-items-baseline  gap-2 mb-3">
          <div className="d-flex align-items-center">
            {stars.map((star) => {
              // ! Intial Fill Percent
              let fillPercentage = 0;
              // ! if user fill the five stars then fill all of it
              if (Rating >= star) {
                fillPercentage = 100;
                // ! if not then find fill percent of fill:
              } else if (Rating > star - 1) {
                fillPercentage = (Rating - (star - 1)) * 100;
              }
            /*
            * assume that:
            * rating: 3.7 , star:4 
            ? fill percentage = (3.7-(4-1)) * 100 = (3.7-3) * 100 = 0.7 * 100 = 70% 
            ? Shape: ⭐⭐⭐🌗
            */
              return (
                <div
                  key={star}
                  className="position-relative"
                  style={{
                    width: "17px",
                    height: "17px",
                  }}
                >
                  <Star
                    size={16}
                    className="text-secondary"
                    strokeWidth={1.5}
                  />

                  <div
                    className="position-absolute top-0 star-filled start-0 overflow-hidden text-warning"
                    style={{
                      width: `${fillPercentage}%`,
  
                    }}
                  >
                    <Star size={16} fill="currentColor" strokeWidth={1.5} />
                  </div>
                </div>
              );
            })}
          </div>

          <small className="text-secondary">
            {Rating.toFixed(1)} ({product?.review_count})
          </small>
        </div>

        {/* Price */}
        <div className="mb-3">
          <span className="fs-5 fw-bold text-danger">
            ${Number(product?.price).toFixed(2)}
          </span>
        </div>

        {/* Stock */}
        <div className="mb-3">
          {product?.stock > 0 ? (
            <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">
              <span className="me-1">●</span>
              In stock {product?.stock}
            </span>
          ) : (
            <span className="badge bg-danger-subtle text-danger rounded-pill px-3 py-2">
              Out of stock
            </span>
          )}
        </div>

        {/* Add To Cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={product?.stock <= 0}
          className="btn btn-outline-danger rounded-3 w-100 mt-auto py-2 d-flex align-items-center justify-content-center gap-2"
        >
          <ShoppingCart size={17} />
          {product?.stock > 0 ? "Add to Cart" : "Unavailable"}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
