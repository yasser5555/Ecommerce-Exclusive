// useProductReviews.js

import { useProductReviewStore } from "../store/productReview.store";

export const useProductReviews = () => {
  return useProductReviewStore();
};
