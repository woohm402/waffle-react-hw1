import { useState } from 'react';
import { useNavigate } from 'react-router';

import { type Review } from '../../../entities/review';
import { Button } from '../../components/Button';
import { FAB } from '../../components/FAB';
import { ReviewItem } from '../../components/ReviewItem';
import { storeContext } from '../../contexts/storeContext';
import { useTypedContext } from '../../hooks/useTypedContext';
import { AddReviewModal } from './AddReviewModal';
import styles from './index.module.css';

export const ReviewsPage = () => {
  const { reviews } = useTypedContext(storeContext);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [reviewState, setReviewState] = useState<{ state: 'idle' } | { state: 'edit'; id: Review['id'] }>({
    state: 'idle',
  });
  const navigate = useNavigate();

  return (
    <>
      <ul className={styles.reviewList} data-testid="review-list">
        {reviews.map((review) => (
          <li key={review.id}>
            <ReviewItem
              showProfile
              review={review}
              state={(() => {
                if (reviewState.state === 'idle')
                  return { state: 'idle', onStartEdit: () => setReviewState({ state: 'edit', id: review.id }) };
                if (reviewState.state === 'edit' && reviewState.id !== review.id) return { state: 'blocked' };
                return { state: 'editing', onEndEdit: () => setReviewState({ state: 'idle' }) };
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
    </>
  );
};
