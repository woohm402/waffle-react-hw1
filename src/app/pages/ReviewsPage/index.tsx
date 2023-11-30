import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';

import { type Review } from '../../../entities/review';
import { classNames } from '../../../utils/classNames';
import { Button } from '../../components/Button';
import { FAB } from '../../components/FAB';
import { ReviewItem } from '../../components/ReviewItem';
import { Skeleton } from '../../components/Skeleton';
import { serviceContext } from '../../contexts/serviceContext';
import { useQuery } from '../../hooks/useQuery';
import { useTypedContext } from '../../hooks/useTypedContext';
import { AddReviewModal } from './AddReviewModal';
import { DeleteReviewModal } from './DeleteReviewModal';
import styles from './index.module.css';

export const ReviewsPage = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [reviewState, setReviewState] = useState<{ state: 'idle' } | { state: 'edit' | 'delete'; id: Review['id'] }>({
    state: 'idle',
  });
  const navigate = useNavigate();
  const { reviewService } = useTypedContext(serviceContext);

  const {
    data: reviews,
    status,
    refetch,
  } = useQuery({
    queryFn: useCallback(() => reviewService.listReviews({}), [reviewService]),
  });

  return (
    <>
      <ul className={styles.reviewList} data-testid="review-list">
        {status === 'pending' ? (
          <>
            <Skeleton className={styles.skeleton} />
            <Skeleton className={styles.skeleton} />
            <Skeleton className={styles.skeleton} />
          </>
        ) : (
          reviews.map((review) => (
            <li key={review.id}>
              <ReviewItem
                showProfile
                review={review}
                state={(() => {
                  if (reviewState.state === 'idle')
                    return {
                      state: 'idle',
                      onStartEdit: () => setReviewState({ state: 'edit', id: review.id }),
                      onStartDelete: () => setReviewState({ state: 'delete', id: review.id }),
                    };
                  if (reviewState.state === 'edit' && reviewState.id !== review.id) return { state: 'blocked' };
                  if (reviewState.state === 'delete') return { state: 'blocked' };
                  return {
                    state: 'editing',
                    onEndEdit: () => {
                      setReviewState({ state: 'idle' });
                      refetch();
                    },
                  };
                })()}
              />
            </li>
          ))
        )}
      </ul>
      <FAB
        className={styles.fab}
        trigger={
          <button data-testid="write-review" className={classNames(styles.addModalButton, styles.closed)}>
            +
          </button>
        }
        openedTrigger={
          <button data-testid="write-review" className={classNames(styles.addModalButton, styles.opened)}>
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

      <AddReviewModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} onAddSuccess={refetch} />
      <DeleteReviewModal
        reviewItem={reviewState.state === 'delete' ? reviews?.find((r) => r.id === reviewState.id) ?? null : null}
        onDeleteSuccess={refetch}
        onClose={() => setReviewState({ state: 'idle' })}
      />
    </>
  );
};
