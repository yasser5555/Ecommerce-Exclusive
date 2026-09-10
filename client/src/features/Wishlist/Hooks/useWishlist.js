import useWishlistStore from "../Store/Wishlist.store";

import { useEffect } from "react";

const useWishlist = () => {
  const {
    wishlist,
    isLoading,
    error,
    get_Wishlist,
    add_ToWishlist,
    remove_FromWishlist,
  } = useWishlistStore();

  const loadWishlist = async () => {
    try {
      await get_Wishlist();
    } catch (error) {
      console.log("4. Wishlist Hook: error in loadWishlist:", error.message);
    }
  };

  const handleAddToWishlist = async (product_id) => {
    try {
      await add_ToWishlist(product_id);
      await get_Wishlist();
    } catch (error) {
      console.log(
        "4. Wishlist Hook: error while adding product:",
        error.message,
      );
    }
  };

  const handleRemoveFromWishlist = async (product_id) => {
    try {
 
      await remove_FromWishlist(product_id);
      await get_Wishlist();

    } catch (error) {
      console.log(
        "4. Wishlist Hook: error while removing product:",
        error.message,
      );
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  return {
    wishlist,
    isLoading,
    error,
    loadWishlist,
    handleAddToWishlist,
    handleRemoveFromWishlist,
  };
};

export default useWishlist;
