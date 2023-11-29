import { useState } from 'react';

import { type Review } from '../../../entities/review';
import { serviceContext } from '../../contexts/serviceContext';
import { useTypedContext } from '../../hooks/useTypedContext';
import { Button } from '../Button';
import { Input } from '../Input';
import { Modal } from '../Modal';
import styles from './index.module.css';

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
  const { reviewService } = useTypedContext(serviceContext);
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
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>{review.image && <img src={review.image} />}</div>
        <Input
          label="이미지"
          data-testid="image-input"
          value={review.image ?? ''}
          onChange={(e) => setReview({ ...review, image: e.target.value })}
          errorMessage={errors.image}
        />
        <Input
          label="과자 이름"
          data-testid="name-input"
          value={review.snackName ?? ''}
          onChange={(e) => setReview({ ...review, snackName: e.target.value })}
          errorMessage={errors.snackName}
        />
        <Input
          label="평점"
          data-testid="rating-input"
          type="number"
          value={review.rating ?? ''}
          onChange={(e) => setReview({ ...review, rating: e.target.value })}
          errorMessage={errors.rating}
        />

        <Input
          label="내용"
          data-testid="content-input"
          value={review.content ?? ''}
          onChange={(e) => setReview({ ...review, content: e.target.value })}
          errorMessage={errors.content}
        />

        <div className={styles.actions}>
          <Button variant="primary" data-testid="submit-review">
            작성
          </Button>
          <Button variant="third" data-testid="cancel-review" type="button" onClick={handleClose}>
            취소
          </Button>
        </div>
      </form>
    </Modal>
  );
};
