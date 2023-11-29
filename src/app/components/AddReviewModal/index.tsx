import { useState } from 'react';

import { Review } from '../../../entities/review';
import { useServiceContext } from '../../contexts/serviceContext';
import { Modal } from '../Modal';

type ReviewForm = Omit<Partial<Record<keyof Review, string>>, 'id'>;

export const AddReviewModal = ({
  isOpen,
  onClose,
  onAddReview,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAddReview: (review: Review) => void;
}) => {
  const { reviewService } = useServiceContext();
  const [review, setReview] = useState<ReviewForm>({});
  const [errors, setErrors] = useState<Partial<Record<keyof Review, string>>>({});

  const handleSubmit = () => {
    const validationResult = reviewService.validateReview(review);
    if (!validationResult.valid) return setErrors(validationResult.errors);
    onAddReview(validationResult.review);
    handleClose();
  };

  const handleClose = () => {
    setReview({});
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} data-testid="write-review-modal">
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
            data-testid="image-input"
            value={review.image ?? ''}
            onChange={(e) => setReview({ ...review, image: e.target.value })}
          />
          <p>{errors.image}</p>
        </label>
        <label>
          과자 이름
          <input
            data-testid="name-input"
            value={review.snackName ?? ''}
            onChange={(e) => setReview({ ...review, snackName: e.target.value })}
          />
          <p data-testid="name-input-message">{errors.snackName}</p>
        </label>
        <label>
          평점
          <input
            data-testid="rating-input"
            type="number"
            value={review.rating ?? ''}
            onChange={(e) => setReview({ ...review, rating: e.target.value })}
          />
          <p data-testid="rating-input-message">{errors.rating}</p>
        </label>
        <label>
          내용
          <input
            data-testid="content-input"
            value={review.content ?? ''}
            onChange={(e) => setReview({ ...review, content: e.target.value })}
          />
          <p data-testid="content-input-message">{errors.content}</p>
        </label>
        <div>
          <button data-testid="submit-review">작성</button>
          <button data-testid="cancel-review" type="button" onClick={handleClose}>
            취소
          </button>
        </div>
      </form>
    </Modal>
  );
};
