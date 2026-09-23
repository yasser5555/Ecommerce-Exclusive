import { useState } from "react";
import { useProductStore } from "../store/product.store";
import { Star } from "lucide-react";

export const useProductReviews = () => {
  const stars = [1, 2, 3, 4, 5];
  const {
    reviews,
    isLoading,
    error,
    fetchReviews,
    createReview,
    deleteReview,
  } = useProductStore();
  const [COMMENT, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e, productId) => {
    // ! Preventing form from submiting
    e.preventDefault();
    // ! if comment is empty return
    if (!COMMENT.trim()) return;
    // ! if Rating is empty return
    if (!rating) return;
    try {
      // ! Set Loading to 1
      setSubmitting(true);
      // ! Send Data to Create Review
      await createReview(productId, COMMENT, rating);
      // ! Clear Comment
      setComment("");
      // ! Clear Rating
      setRating(0);
      // ! Clear Hover
      setHoverRating(0);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };
  // handleSubmit , averageRating
  const averageRating =
    reviews.length > 0
      ? /*
         * reduce function returns single value , it uses two parameters:
         * Sum: Accumalator and it start from intial value we added it
         * review: Current value of array for Example:
         * 5+4+4+5+4+4 = 26 and and total number is 6
         * then average = 26 / 6 = 4.3333.toFixed(1) = 4.3
         */
        (
          reviews.reduce((sum, review) => sum + (review.rating || 0), 0) /
          reviews.length
        ).toFixed(1)
      : "0.0"; // * in case no reviews

  const getAvatarUrl = (avatar) => {
    // ! if no Avatar then Return Null
    if (!avatar) return null;
    // ! check avatar is full Url like: "https://example.com/user.jpg"  
    if (avatar.startsWith("http://") || avatar.startsWith("https://")) {
      return avatar;
    }
    // ! otherwise local server Avatar  
    return `http://localhost:5000/${avatar}`;
  };
  const isloaded = () => {
    if (isLoading) {
      return (
        <section className="py-5">
          <div className="text-center py-5">
            <div className="spinner-border" role="status" />
            <p className="text-muted mt-3 mb-0"> Loading reviews... </p>
          </div>
        </section>
      );
    }
  };
  const renderStars = (value, interactive = false) => {
    const activeValue = interactive ? hoverRating || rating : value;
    return (
      <div className="d-flex align-items-center gap-1">
        {stars.map((star) => (
          <Star
            key={star}
            size={interactive ? 25 : 17}
            strokeWidth={0.8}
            fill={star <= activeValue ? "#ffc107" : "none"}
            color={star <= activeValue ? "#ffc107" : "#adb5bd"}
            style={{
              cursor: interactive ? "pointer" : "default",
              transition: "all 1s ease",
            }}
            onMouseEnter={interactive ? () => setHoverRating(star) : undefined}
            onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
            onClick={interactive ? () => setRating(star) : undefined}
          />
        ))}
      </div>
    );
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId); 
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return {
    reviews,
    isLoading,
    error,
    fetchReviews,
    createReview,
    COMMENT,
    setComment,
    rating,
    setRating,
    hoverRating,
    setHoverRating,
    submitting,
    setSubmitting,
    handleSubmit,
    averageRating,
    getAvatarUrl,
    isloaded,
    renderStars,
    handleDeleteReview,
  };
};
