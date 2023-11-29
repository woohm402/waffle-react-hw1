import { useId, useState } from 'react';

import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { Modal } from '../../../components/Modal';
import { serviceContext } from '../../../contexts/serviceContext';
import { storeContext } from '../../../contexts/storeContext';
import { useTypedContext } from '../../../hooks/useTypedContext';
import styles from './index.module.css';

type ReviewForm = Partial<{ snackTitle: string; rating: string; content: string }>;

export const AddReviewModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const snackTitleId = useId();
  const { reviewService } = useTypedContext(serviceContext);
  const [review, setReview] = useState<ReviewForm>({});
  const [errors, setErrors] = useState<Partial<Record<keyof ReviewForm, string>>>({});
  const { snacks, createReview } = useTypedContext(storeContext);

  const handleSubmit = () => {
    const validationResult = reviewService.validateReview(review, snacks);
    if (!validationResult.valid) return setErrors(validationResult.errors);
    createReview(validationResult.review);
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
        <Input
          list={snackTitleId}
          label="과자 이름"
          data-testid="name-input"
          value={review.snackTitle ?? ''}
          onChange={(e) => setReview({ ...review, snackTitle: e.target.value })}
          errorMessage={errors.snackTitle}
        />
        <datalist id={snackTitleId}>
          {snacks
            .filter((s) => s.title.includes(review.snackTitle ?? ''))
            .map((s) => (
              <option key={s.id} value={s.title} />
            ))}
        </datalist>

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
