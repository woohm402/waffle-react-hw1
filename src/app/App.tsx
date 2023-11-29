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
import { Modal } from "./components/Modal";

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
  const [reviewState, setReviewState] = useState<
    | { state: "idle" }
    | { state: "edit"; id: number; draft: string }
    | { state: "delete"; id: number }
  >({ state: "idle" });

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
              onEditReview={() =>
                setReviewState({
                  state: "edit",
                  id: review.id,
                  draft: review.content,
                })
              }
              onDeleteReview={() =>
                setReviewState({ state: "delete", id: review.id })
              }
              state={(() => {
                if (reviewState.state === "idle") return { state: "idle" };
                if (reviewState.state === "delete") return { state: "blocked" };
                if (
                  reviewState.state === "edit" &&
                  reviewState.id !== review.id
                )
                  return { state: "blocked" };
                return {
                  state: "editing",
                  draft: reviewState.draft,
                  onChange: (e: string) =>
                    setReviewState({ state: "edit", id: review.id, draft: e }),
                  onChangeSubmit: () => {
                    try {
                      const newReview = {
                        ...review,
                        content: createReviewContent(reviewState.draft),
                      };
                      setReviews(
                        reviews.map((r) => (r.id === review.id ? newReview : r))
                      );
                      setReviewState({ state: "idle" });
                    } catch (err) {
                      //
                    }
                  },
                  onChangeCancel: () => setReviewState({ state: "idle" }),
                };
              })()}
            />
          </li>
        ))}
      </ul>
      <button
        data-testid="write-review"
        className="addModal"
        onClick={() => setAddModalOpen(true)}
      >
        +
      </button>
      <AddReviewModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAddReview={(newReview) => setReviews([newReview, ...reviews])}
      />
      <Modal
        isOpen={reviewState.state === "delete"}
        onClose={() => setReviewState({ state: "idle" })}
      >
        <h2>리뷰 삭제</h2>
        {reviewState.state === "delete" &&
          (() => {
            const deleting = reviews.find((r) => r.id === reviewState.id);

            if (!deleting) return; // cannot reach here

            return (
              <>
                <p>"{deleting.snackName}"에 대한 리뷰를 삭제하시겠습니까?</p>
                <div>
                  <button
                    data-testid="delete-review-delete"
                    onClick={() => {
                      setReviewState({ state: "idle" });
                      setReviews(reviews.filter((r) => r.id !== deleting.id));
                    }}
                  >
                    삭제
                  </button>
                  <button
                    data-testid="delete-review-cancel"
                    onClick={() => setReviewState({ state: "idle" })}
                  >
                    취소
                  </button>
                </div>
              </>
            );
          })()}
      </Modal>
    </div>
  );
};
