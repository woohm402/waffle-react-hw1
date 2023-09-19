import { Review } from "../../../entities/review";
import "./index.css";

export const ReviewItem = ({
  review,
}: {
  review: Review;
  onChangeReview: (newReview: Review) => void;
  onDeleteReview: () => void;
}) => {
  return (
    <div className="reviewItem" data-testid="review">
      <img src={review.image} className="reviewImage" />
      <div>
        <div className="reviewName">
          <strong>{review.snackName}</strong>
          <span>/</span>
          <b>*{review.rating.toFixed(1)}</b>
        </div>
        <p className="reviewContent">{review.content}</p>
      </div>
    </div>
  );
};
