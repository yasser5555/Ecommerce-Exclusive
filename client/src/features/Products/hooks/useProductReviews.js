import { useState } from "react";
import { useProductStore } from "../store/product.store";
import { Star } from "lucide-react";

export const useProductReviews = () => {
  const { reviews, isLoading, error, fetchReviews, createReview } =
    useProductStore();
  const [COMMENT, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e, productId) => {
    e.preventDefault();
    if (!COMMENT.trim()) return;
    if (!rating) return;
    try {
      setSubmitting(true);
      await createReview(productId, COMMENT, rating);
      setComment("");
      setRating(0);
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
      ? (
          reviews.reduce((sum, review) => sum + (review.rating || 0), 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  const getAvatarUrl = (avatar) => {
    if (!avatar) return null;

    // لو URL كامل
    if (avatar.startsWith("http://") || avatar.startsWith("https://")) {
      return avatar;
    }

    // لو صورة مرفوعة على الـ backend
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
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={interactive ? 25 : 17}
            strokeWidth={1.8}
            fill={star <= activeValue ? "#ffc107" : "none"}
            color={star <= activeValue ? "#ffc107" : "#adb5bd"}
            style={{
              cursor: interactive ? "pointer" : "default",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={interactive ? () => setHoverRating(star) : undefined}
            onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
            onClick={interactive ? () => setRating(star) : undefined}
          />
        ))}
      </div>
    );
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
  };
};
