import { useState } from 'react';
import { useNavigate } from 'react-router';

import { createReviewContent, type Review } from '../../../entities/review';
import { Button } from '../../components/Button';
import { FAB } from '../../components/FAB';
import { ReviewItem } from '../../components/ReviewItem';
import { storeContext } from '../../contexts/storeContext';
import { useTypedContext } from '../../hooks/useTypedContext';
import { AddReviewModal } from './AddReviewModal';
import { DeleteReviewModal } from './DeleteReviewModal';
import styles from './index.module.css';

export const ReviewsPage = () => {
  const { reviews, updateReview, deleteReview } = useTypedContext(storeContext);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [reviewState, setReviewState] = useState<
    { state: 'idle' } | { state: 'edit'; id: Review['id']; draft: string } | { state: 'delete'; id: Review['id'] }
  >({ state: 'idle' });
  const navigate = useNavigate();

  return (
    <>
      <ul className={styles.reviewList} data-testid="review-list">
        {reviews.map((review) => (
          <li key={review.id}>
            <ReviewItem
              review={review}
              onEditReview={() =>
                setReviewState({
                  state: 'edit',
                  id: review.id,
                  draft: review.content,
                })
              }
              onDeleteReview={() => setReviewState({ state: 'delete', id: review.id })}
              state={(() => {
                if (reviewState.state === 'idle') return { state: 'idle' };
                if (reviewState.state === 'delete') return { state: 'blocked' };
                if (reviewState.state === 'edit' && reviewState.id !== review.id) return { state: 'blocked' };
                return {
                  state: 'editing',
                  draft: reviewState.draft,
                  onChange: (e: string) => setReviewState({ state: 'edit', id: review.id, draft: e }),
                  onChangeSubmit: () => {
                    try {
                      updateReview(review.id, { content: createReviewContent(reviewState.draft) });
                      setReviewState({ state: 'idle' });
                    } catch (err) {
                      //
                    }
                  },
                  onChangeCancel: () => setReviewState({ state: 'idle' }),
                };
              })()}
            />
          </li>
        ))}
      </ul>
      <FAB
        className={styles.fab}
        trigger={
          <button data-testid="write-review" className={styles.addModalButton}>
            +
          </button>
        }
        openedTrigger={
          <button data-testid="write-review" className={styles.addModalButton}>
            X
          </button>
        }
      >
        <div className={styles.fabContent}>
          <Button variant="secondary" onClick={() => setAddModalOpen(true)}>
            새 리뷰
          </Button>
          <Button variant="secondary" onClick={() => navigate('/snacks/new')}>
            새 과자
          </Button>
        </div>
      </FAB>

      <AddReviewModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} />
      <DeleteReviewModal
        reviewItem={reviewState.state === 'delete' ? reviews.find((r) => r.id === reviewState.id) ?? null : null}
        onClose={() => setReviewState({ state: 'idle' })}
        onDelete={() => {
          if (reviewState.state !== 'delete') return;

          deleteReview(reviewState.id);
          setReviewState({ state: 'idle' });
        }}
      />
    </>
  );
};
