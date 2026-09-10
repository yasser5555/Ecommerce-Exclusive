import React from "react";

import WishlistCard from "../Component/WishlistCard";
import useWishlist from "../Hooks/useWishlist";

export default function WishlistPage() {
  const { wishlist, isLoading, error, handleRemoveFromWishlist } =
    useWishlist();

  const addToCart = (product) => {
    try {
      console.log(
        `1. WishlistPage: add to cart started for product ${product.id}`,
      );

      console.log("2. WishlistPage: product received:", product);

      // Cart logic will be connected later.

      console.log(
        `3. WishlistPage: product ${product.id} is ready to be added to cart`,
      );

      console.log(
        `4. WishlistPage: add to cart finished for product ${product.id}`,
      );
    } catch (error) {
      console.log(
        "4. WishlistPage: error while adding product to cart:",
        error,
      );
    }
  };

  if (isLoading) {
    return (
      <div className="container py-4">
        <div className="text-center py-5">
          <h5>Loading wishlist...</h5>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-end mb-3">
        <div>
          <h3 className="fw-bold mb-1">Saved Items</h3>

          <small className="text-secondary">
            {wishlist.length} items in your wishlist
          </small>
        </div>

        <div className="d-flex gap-2"></div>
      </div>

      {/* Wishlist */}
      <div className="border rounded overflow-hidden">
        {wishlist.length === 0 ? (
          <div className="text-center py-5">
            <h5 className="fw-bold">Your wishlist is empty</h5>

            <p className="text-secondary mb-0">
              Add products you love to your wishlist.
            </p>
          </div>
        ) : (
          wishlist?.map((product) => (
            <WishlistCard
              key={product.id}
              product={product}
              onRemove={handleRemoveFromWishlist}
              onAddToCart={addToCart}
            />
          ))
        )}
      </div>
    </div>
  );
}
