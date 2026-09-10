const WishlistService = require("./wishlist.service");

const getUserWishlist = async (req, res) => {
  try {
    const user_id = req.user.id;
    const Wishlist = await WishlistService.getUserWishlist(user_id);
    return res.status(200).json({
      success: true,
      wishlist: Wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `error at Wishlist.controller.getUserWishlist ===> ${error}`,
    });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { product_id } = req.body;
    const result = await WishlistService.addToWishlist(
      user_id,
      product_id
    );

    return res.status(201).json({
      success: true,
      message: "Product added to wishlist successfully",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `error at Wishlist.controller.addToWishlist ===> ${error}`,
    });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { product_id } = req.params;

    const result = await WishlistService.removeFromWishlist(
      user_id,
      product_id
    );

    return res.status(200).json({
      success: true,
      message: "Product removed from wishlist successfully",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `error at Wishlist.controller.removeFromWishlist ===> ${error}`,
    });
  }
};

module.exports = {
  getUserWishlist,
  addToWishlist,
  removeFromWishlist,
};