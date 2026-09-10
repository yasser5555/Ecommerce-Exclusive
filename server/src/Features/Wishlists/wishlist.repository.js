const db = require("../../shared/Database/DB");

const getUserWishlist = async (user_id) => {
  try {
    const [Wishlist, x] = await db.query(`CALL get_user_wishlist(?)`, [
      user_id,
    ]);
    return Wishlist;
  } catch (error) {
    throw new Error(`error at Wishlist.repo.getUserWishlist ===> ${error}`);
  }
};

const addToWishlist = async (user_id, product_id) => {
  try {
    const [result] = await db.query(`CALL add_to_wishlist(?, ?)`, [
      user_id,
      product_id,
    ]);

    return result;
  } catch (error) {
    throw new Error(`error at Wishlist.repo.addToWishlist ===> ${error}`);
  }
};

const removeFromWishlist = async (user_id, product_id) => {
  try {
    const [result] = await db.query(`CALL remove_from_wishlist(?, ?)`, [
      user_id,
      product_id,
    ]);

    return result;
  } catch (error) {
    throw new Error(`error at Wishlist.repo.removeFromWishlist ===> ${error}`);
  }
};

module.exports = {
  getUserWishlist,
  addToWishlist,
  removeFromWishlist,
};
