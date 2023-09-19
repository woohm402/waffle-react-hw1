import { Review } from "../entities/review";
import data from "../data.json";
import { useState } from "react";
import { ReviewItem } from "./components/ReviewItem";
import "./reset.css";
import "./App.css";

const initialData = data.map(
  ({ content, id, image, rating, snack_name }): Review => {
    if (
      rating !== 1 &&
      rating !== 2 &&
      rating !== 3 &&
      rating !== 4 &&
      rating !== 5
    )
      throw new Error("Invalid rating");

    return { id, content, image, snackName: snack_name, rating };
  }
);

export const App = () => {
  const [reviews, setReviews] = useState<Review[]>(initialData);

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
    </div>
  );
};
