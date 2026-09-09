const reviewService = require("./Product_Reviews.service");

const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await reviewService.getProductReviews(productId);
    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Getting ProductReviews", error: error.message });
  }
};

const createReview = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { comment , rating } = req.body;
    const userId = req.user.id;
    const review = await reviewService.createReview(userId, productId, comment,rating);
    res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: review,
    });
  } catch (error) {
    res.status(500).json({ message: "Error Getting createReview", error: error.message });
  }
};

module.exports = {
  getProductReviews,
  createReview,
};
