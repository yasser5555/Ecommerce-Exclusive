import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import WishlistCard from "../Component/WishlistCard";
import useWishlist from "../Hooks/useWishlist";
import { useChangeTitle } from "../../../../shared/Utils/useChangeTitle";
import useCartStore from "../../Cart/store/Cart.store";
import { toast } from "react-toastify";
import { useAuthStore } from "../../../auth/store/auth.store";
import useCartAnimationStore from "../../../../shared/Store/cartAnimation.store";

export default function WishlistPage() {
  useChangeTitle({ title: `Wishlist` });
  const { addProductToCart, cart } = useCartStore();
  const { user } = useAuthStore();
  const triggerAnimation = useCartAnimationStore(
    (state) => state.triggerAnimation,
  );
  const handleAddToCart = async (product, sourceImage) => {
    // ! Check if the product already exists in the user's cart
    const existingProduct = cart.find(
      (item) => Number(item.product_id) === Number(product.p_id),
    );

    // ! If the product already exists, show a message and stop
    if (existingProduct) {
      toast.info("Product Already Added to your Cart");
      return;
    }

    // ! If the product does not exist, add it to the cart with quantity 1
    const added = await addProductToCart({
      // ! Which product does the user want to add to the cart
      product_id: product.p_id,
      // ! The initial quantity is 1
      quantity: 1,
      // ! Which user is adding the product to the cart
      user_id: user?.id,
    });

    if (added && sourceImage) {
      const cartIcon = document.querySelector("[data-cart-icon]");
      if (cartIcon) {
        triggerAnimation({
          image: sourceImage.currentSrc || product.image,
          startRect: sourceImage.getBoundingClientRect(),
          endRect: cartIcon.getBoundingClientRect(),
        });
      }
    }
  };
  const { wishlist, isLoading, error, handleRemoveFromWishlist } =
    useWishlist();


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
    <div className="container py-4 min-vh-100">
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
        <AnimatePresence initial={false} mode="popLayout">
          {wishlist.length === 0 ? (
            <motion.div
              key="empty-wishlist"
              className="text-center py-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h5 className="fw-bold">Your wishlist is empty</h5>

              <p className="text-secondary mb-0">
                Add products you love to your wishlist.
              </p>
            </motion.div>
          ) : (
            wishlist?.map((product) => (
              <motion.div
                key={product.id}
                className="overflow-hidden"
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  x: -24,
                  height: 0,
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <WishlistCard
                  product={product}
                  onRemove={handleRemoveFromWishlist}
                  onAddToCart={handleAddToCart}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
