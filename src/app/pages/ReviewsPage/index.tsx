import { useState } from 'react';

import { createReviewContent, type Review } from '../../../entities/review';
import { AddReviewModal } from '../../components/AddReviewModal';
import { DeleteReviewModal } from '../../components/DeleteReviewModal';
import { ReviewItem } from '../../components/ReviewItem';
import { storeContext } from '../../contexts/storeContext';
import { useTypedContext } from '../../hooks/useTypedContext';
import styles from './index.module.css';

export const ReviewsPage = () => {
  const { reviews, updateReview, createReview, deleteReview } = useTypedContext(storeContext);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [reviewState, setReviewState] = useState<
    { state: 'idle' } | { state: 'edit'; id: Review['id']; draft: string } | { state: 'delete'; id: Review['id'] }
  >({ state: 'idle' });

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
      <button data-testid="write-review" className={styles.addModalButton} onClick={() => setAddModalOpen(true)}>
        +
      </button>
      <AddReviewModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} onAddReview={createReview} />
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