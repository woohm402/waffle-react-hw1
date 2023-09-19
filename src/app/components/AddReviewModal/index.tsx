import { useState } from "react";
import { Review } from "../../../entities/review";
import { Modal } from "../Modal";

type ReviewForm = Partial<Record<keyof Review, string>>;

export const AddReviewModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAddReview: (review: Review) => void;
}) => {
  const [review, setReview] = useState<ReviewForm>({});

  const handleSubmit = () => {};

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <h2>리뷰 쓰기</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>{review.image && <img src={review.image} />}</div>
        <label>
          이미지
          <input
            value={review.image}
            onChange={(e) => setReview({ ...review, image: e.target.value })}
          />
        </label>
        <label>
          과자 이름
          <input
            value={review.snackName}
            onChange={(e) =>
              setReview({ ...review, snackName: e.target.value })
            }
          />
        </label>
        <label>
          평점
          <input
            type="number"
            value={review.rating}
            onChange={(e) => setReview({ ...review, rating: e.target.value })}
          />
        </label>
        <label>
          내용
          <input
            value={review.image}
            onChange={(e) => setReview({ ...review, image: e.target.value })}
          />
        </label>
        <div>
          <button>작성</button>
          <button type="button" onClick={handleClose}>
            취소
          </button>
        </div>
      </form>
    </Modal>
  );
};
