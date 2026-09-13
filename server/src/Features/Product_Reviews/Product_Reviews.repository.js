const db = require("../../shared/Database/db");

const getProductReviews = async (productId) => {
  try {
    const [productReiveews, x] = await db.query(
      `SELECT * FROM product_comments where product_id = ?`,
      [productId],
    );
    return productReiveews;
  } catch (error) {
    console.error(
      `error at Product.repository.getProductReviews ===> ${error.message}`,
    );
  }
};

const createReview = async (userId, productId, comment, rating) => {
  try {
    const [createdReview, x] = await db.query(
      `  INSERT INTO product_reviews 
   (user_id, product_id, comment, rating) 
   VALUES (?, ?, ?, ?)`,
      [userId, productId, comment, rating],
    );
    return createdReview[0];
  } catch (error) {
    console.error(
      `error at Product.repository.createReview ===> ${error.message}`,
    );
  }
};
const deleteReview = async (reviewId, userId) => {
  try {
    const [deletedReview] = await db.query(
      `DELETE FROM product_reviews
       WHERE product_reviews.id = ? AND product_reviews.user_id = ?`,
      [reviewId, userId],
    );

    return deletedReview;
  } catch (error) {
    console.error(
      `error at Product.repository.deleteReview ===> ${error.message}`,
    );
    throw error;
  }
};

module.exports = {
  getProductReviews,
  createReview,
  deleteReview,
};
 
