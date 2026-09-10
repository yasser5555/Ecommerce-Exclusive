const WishlistRepository = require("./wishlist.repository");

const getUserWishlist = async (user_id) => {
  try {
    const Wishlist = await WishlistRepository.getUserWishlist(user_id);
    return Wishlist;
  } catch (error) {
    throw new Error(`error at Wishlist.service.getUserWishlist ===> ${error}`);
  }
};

const addToWishlist = async (user_id, product_id) => {
  try {
    const result = await WishlistRepository.addToWishlist(user_id, product_id);
    return result;
  } catch (error) {
    throw new Error(`error at Wishlist.service.addToWishlist ===> ${error}`);
  }
};

const removeFromWishlist = async (user_id, product_id) => {
  try {
    const result = await WishlistRepository.removeFromWishlist(
      user_id,
      product_id,
    );

    return result;
  } catch (error) {
    throw new Error(
      `error at Wishlist.service.removeFromWishlist ===> ${error}`,
    );
  }
};

module.exports = {
  getUserWishlist,
  addToWishlist,
  removeFromWishlist,
};
