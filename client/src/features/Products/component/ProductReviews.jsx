import { useEffect, useState } from "react";
import { Star, Send, MessageCircle } from "lucide-react";
import { useProductStore } from "../store/product.store";

export default function ProductReviews({ productId }) {
  const { reviews, isLoading, error, fetchReviews, createReview } =
    useProductStore();
  const [COMMENT, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews(productId);
  }, [productId]);

  const handleSubmit = async (e) => {
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
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + (review.rating || 0), 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";
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
  const getAvatarUrl = (avatar) => {
    if (!avatar) return null;

    // لو URL كامل
    if (avatar.startsWith("http://") || avatar.startsWith("https://")) {
      return avatar;
    }

    // لو صورة مرفوعة على الـ backend
    return `http://localhost:5000/${avatar}`;
  };
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
  return (
    <section className="py-4 py-lg-5">
      {/* Header */}
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-end gap-3 mb-4">
        <div>
          <span className="text-uppercase small fw-semibold text-muted">
            Customer feedback
          </span>
          <h2 className="fw-bold mt-1 mb-2"> Customer Reviews </h2>
          <p className="text-muted mb-0">
            See what other customers think about this product.
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <MessageCircle size={20} className="text-muted" />
          <span className="fw-semibold">
            {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
          </span>
        </div>
      </div>
      {/* Summary + Form */}
      <div className="row g-4 mb-5">
        {/* Rating Summary */}
        <div className="col-12 col-lg-4">
          <div className="bg-light rounded-4 p-4 h-100">
            <p className="text-muted small mb-2"> Overall rating </p>
            <div className="d-flex align-items-center gap-3 mb-3">
              <span className="display-5 fw-bold"> {averageRating} </span>
              <div>
                {renderStars(Number(averageRating))}
                <small className="text-muted d-block mt-1">
                  Based on {reviews.length} reviews
                </small>
              </div>
            </div>
            <div className="border-top pt-3 mt-3">
              <div className="d-flex justify-content-between small">
                <span className="text-muted"> Customer feedback </span>
                <span className="fw-semibold">
                  {reviews.length > 0 ? "Positive" : "-"}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Write Review */}
        <div className="col-12 col-lg-8">
          <div className="border rounded-4 p-4 h-100">
            <h5 className="fw-bold mb-1"> Share your experience </h5>
            <p className="text-muted small mb-4">
              Your feedback helps other customers.
            </p>
            <form onSubmit={handleSubmit}>
              {/* Rating */}
              <div className="mb-3">
                <label className="form-label fw-semibold small">
                  Your rating
                </label>
                {renderStars(rating, true)}
                {rating > 0 && (
                  <small className="text-muted mt-1 d-block">
                    You rated this product {rating} out of 5
                  </small>
                )}
              </div>
              {/* Comment */}
              <div className="mb-3">
                <label
                  htmlFor="product-review"
                  className="form-label fw-semibold small"
                >
                  Your review
                </label>
                <textarea
                  id="product-review"
                  className="form-control border-0 bg-light rounded-3"
                  rows="4"
                  value={COMMENT}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="What did you like or dislike about this product?"
                />
              </div>
              {error && <div className="text-danger small mb-3"> {error} </div>}
              <button
                type="submit"
                disabled={submitting || !COMMENT.trim() || !rating}
                className="btn btn-dark rounded-3 px-4 py-2 d-flex align-items-center gap-2"
              >
                <Send size={16} />
                {submitting ? "Posting..." : "Post Review"}
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* Reviews */}
      <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0"> Recent reviews </h5>
        </div>
        {reviews.length === 0 ? (
          <div className="border rounded-4 text-center py-5">
            <MessageCircle size={36} className="text-muted mb-3" />
            <h6 className="fw-bold"> No reviews yet </h6>
            <p className="text-muted small mb-0">
              Be the first to review this product.
            </p>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {reviews.map((review) => (
              <article
                key={review.review_id}
                className="border rounded-4 p-3 p-lg-4"
              >
                <div className="d-flex gap-3">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {review.avatar ? (
                      <img
                        src={getAvatarUrl(review.avatar)}
                        alt={review.email}
                        width="48"
                        height="48"
                        className="rounded-circle"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <div
                        className="rounded-circle bg-light d-flex align-items-center justify-content-center fw-bold"
                        style={{ width: "48px", height: "48px" }}
                      >
                        {review.email?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  {/* Content */}
                  <div className="flex-grow-1">
                    <div className="d-flex flex-column flex-lg-row justify-content-between gap-2">
                      <div>
                        <h6 className="fw-bold mb-1"> {review.email} </h6>
                        <div className="d-flex align-items-center gap-2">
                          {renderStars(review.rating || 0)}
                          {review.rating && (
                            <small className="text-muted">
                              {review.rating}.0
                            </small>
                          )}
                        </div>
                      </div>
                      <small className="text-muted">
                        {new Date(review.commented_at).toLocaleDateString()}
                      </small>
                    </div>
                    <p className="text-secondary mb-0 mt-3 lh-lg">
                      {review.COMMENT}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
