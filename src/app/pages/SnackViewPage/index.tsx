import { useCallback, useState } from 'react';
import { useParams } from 'react-router';

import { type Review } from '../../../entities/review';
import { createSnackId } from '../../../entities/snack';
import { ReviewItem } from '../../components/ReviewItem';
import { Skeleton } from '../../components/Skeleton';
import { SnackCard } from '../../components/SnackCard';
import { serviceContext } from '../../contexts/serviceContext';
import { useQuery } from '../../hooks/useQuery';
import { useTypedContext } from '../../hooks/useTypedContext';
import styles from './index.module.css';

export const SnackViewPage = () => {
  const { snackId: snackIdParam } = useParams();
  const { snackService, reviewService } = useTypedContext(serviceContext);
  const [reviewState, setReviewState] = useState<{ state: 'idle' } | { state: 'edit'; id: Review['id'] }>({
    state: 'idle',
  });

  if (!snackIdParam) throw new Error();

  const snackId = createSnackId(parseInt(snackIdParam));

  const { data: snack } = useQuery({
    queryFn: useCallback(() => snackService.getSnack(snackId), [snackService, snackId]),
  });
  const { data: reviews } = useQuery({
    queryFn: useCallback(() => reviewService.listReviews({ snackId }), [reviewService, snackId]),
  });

  return (
    <div>
      <div className={styles.snack}>
        {!snack ? <Skeleton className={styles.snackSkeleton} /> : <SnackCard snack={snack} />}
      </div>
      <ul className={styles.reviews}>
        {!reviews ? (
          <>
            <Skeleton className={styles.reviewSkeleton} />
            <Skeleton className={styles.reviewSkeleton} />
            <Skeleton className={styles.reviewSkeleton} />
          </>
        ) : (
          reviews.map((review) => (
            <li key={review.id}>
              <ReviewItem
                showProfile={false}
                review={review}
                state={(() => {
                  if (reviewState.state === 'idle')
                    return { state: 'idle', onStartEdit: () => setReviewState({ state: 'edit', id: review.id }) };
                  if (reviewState.state === 'edit' && reviewState.id !== review.id) return { state: 'blocked' };
                  return { state: 'editing', onEndEdit: () => setReviewState({ state: 'idle' }) };
                })()}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
