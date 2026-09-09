const reviewRepository = require("./Product_Reviews.repository");

const getProductReviews = async (productId) => {
  try {
    const reviews = await reviewRepository.getProductReviews(productId);
    return reviews;
  } catch (error) {
    throw new Error(
      `error at Product_Reviews.service.getProductReviews ===> ${error}`,
    );
  }
};

const createReview = async (userId, productId, comment,rating) => {
  try {
    if (!comment || !comment.trim()) {
      throw new Error("Comment cannot be empty");
    }

    if (comment.trim().length > 3000) {
      throw new Error("Comment is too long");
    }

    const reviewId = await reviewRepository.createReview(
      userId,
      productId,
      comment.trim(),
      rating
    );

    return {
      reviewId,
      productId,
      rating,
      comment: comment.trim(),
    };
  } catch (error) {
    throw new Error(
      `error at Product_Reviews.service.createReview ===> ${error}`,
    );
  }
};

module.exports = {
  getProductReviews,
  createReview,
};
