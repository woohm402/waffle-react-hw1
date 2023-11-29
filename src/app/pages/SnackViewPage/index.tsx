import { useCallback, useState } from 'react';
import { useParams } from 'react-router';

import { type Review } from '../../../entities/review';
import { createSnackId } from '../../../entities/snack';
import { ReviewItem } from '../../components/ReviewItem';
import { SnackCard } from '../../components/SnackCard';
import { serviceContext } from '../../contexts/serviceContext';
import { useQuery } from '../../hooks/useQuery';
import { useTypedContext } from '../../hooks/useTypedContext';

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

  if (!snack) return <div>loading...</div>;

  return (
    <div>
      <SnackCard snack={snack} />
      {reviews?.map((review) => (
        <ReviewItem
          showProfile={false}
          key={review.id}
          review={review}
          state={(() => {
            if (reviewState.state === 'idle')
              return { state: 'idle', onStartEdit: () => setReviewState({ state: 'edit', id: review.id }) };
            if (reviewState.state === 'edit' && reviewState.id !== review.id) return { state: 'blocked' };
            return { state: 'editing', onEndEdit: () => setReviewState({ state: 'idle' }) };
          })()}
        />
      ))}
    </div>
  );
};
