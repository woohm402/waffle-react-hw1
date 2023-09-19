import {
  Review,
  createReviewContent,
  createReviewId,
  createReviewImage,
  createReviewRating,
  createReviewSnackName,
} from "../entities/review";
import data from "../data.json";
import { useState } from "react";
import { ReviewItem } from "./components/ReviewItem";
import "./reset.css";
import "./App.css";
import { AddReviewModal } from "./components/AddReviewModal";

const initialData = data.map(
  ({ content, id, image, rating, snack_name }): Review => {
    return {
      id: createReviewId(id),
      content: createReviewContent(content),
      image: createReviewImage(image),
      snackName: createReviewSnackName(snack_name),
      rating: createReviewRating(rating),
    };
  }
);

export const App = () => {
  const [reviews, setReviews] = useState<Review[]>(initialData);
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  return (
    <div className="wrapper">
      <header data-testid="header" className="header">
        <a href="https://wafflestudio.com">
          <img
            className="logo"
            src="https://wafflestudio.com/images/icon_intro.svg"
            data-testid="waffle-logo"
            alt="와플스튜디오"
          />
          <h1 className="title" data-testid="header-title">
            과자 리뷰
          </h1>
        </a>
      </header>
      <ul className="reviewList" data-testid="review-list">
        {reviews.map((review) => (
          <li key={review.id}>
            <ReviewItem
              review={review}
              onChangeReview={(newReview) =>
                setReviews(
                  reviews.map((r) => (r.id === newReview.id ? newReview : r))
                )
              }
              onDeleteReview={() =>
                setReviews(reviews.filter((r) => r.id !== review.id))
              }
            />
          </li>
        ))}
      </ul>
      <button className="addModal" onClick={() => setAddModalOpen(true)}>
        +
      </button>
      <AddReviewModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAddReview={(newReview) => setReviews([newReview, ...reviews])}
      />
    </div>
  );
};
