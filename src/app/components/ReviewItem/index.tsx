import { useState } from 'react';

import { createReviewContent, type Review } from '../../../entities/review';
import { storeContext } from '../../contexts/storeContext';
import { useTypedContext } from '../../hooks/useTypedContext';
import { DeleteReviewModal } from '../../pages/ReviewsPage/DeleteReviewModal';
import { ProfileImage } from '../ProfileImage';
import styles from './index.module.css';

export const ReviewItem = ({
  review,
  state,
  showProfile,
}: {
  review: Review;
  state:
    | { state: 'idle'; onStartEdit: () => void }
    | { state: 'editing'; onEndEdit: () => void }
    | { state: 'blocked' };
  showProfile: boolean;
}) => {
  const { snacks, updateReview, deleteReview } = useTypedContext(storeContext);
  const [draft, setDraft] = useState<string>();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
    <div className={styles.reviewItem} data-testid="review">
      {showProfile && <ProfileImage src={snacks.find((s) => s.id === review.snackId)?.src} />}
      <div>
        <div className={styles.reviewName}>
          <strong>{snacks.find((s) => s.id === review.snackId)?.title}</strong>
          <span>/</span>
          <b>*{review.rating.toFixed(1)}</b>
          {state.state === 'idle' ? (
            <div>
              <button data-testid="edit-review" onClick={state.onStartEdit}>
                수정
              </button>
              <button data-testid="delete-review" onClick={() => setDeleteModalOpen(true)}>
                삭제
              </button>
            </div>
          ) : state.state === 'editing' ? (
            <div>
              <button
                data-testid="edit-review-save"
                onClick={() => {
                  if (!draft) return;
                  updateReview(review.id, { content: createReviewContent(draft) });
                }}
              >
                저장
              </button>
              <button data-testid="edit-review-cancel" onClick={state.onEndEdit}>
                취소
              </button>
            </div>
          ) : null}
        </div>
        {state.state === 'editing' ? (
          <textarea
            data-testid="edit-review-content-input"
            className={styles.reviewContent}
            value={draft ?? review.content}
            onChange={(e) => setDraft(e.target.value)}
          />
        ) : (
          <p className={styles.reviewContent}>{review.content}</p>
        )}
      </div>
      <DeleteReviewModal
        reviewItem={isDeleteModalOpen ? review : null}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={() => deleteReview(review.id)}
      />
    </div>
  );
};
