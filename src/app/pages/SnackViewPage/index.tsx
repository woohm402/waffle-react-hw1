import { useState } from 'react';
import { useParams } from 'react-router';

import { type Review } from '../../../entities/review';
import { createSnackId } from '../../../entities/snack';
import { ReviewItem } from '../../components/ReviewItem';
import { SnackCard } from '../../components/SnackCard';
import { storeContext } from '../../contexts/storeContext';
import { useTypedContext } from '../../hooks/useTypedContext';

export const SnackViewPage = () => {
  const { snackId } = useParams();
  const { snacks, reviews } = useTypedContext(storeContext);
  const [reviewState, setReviewState] = useState<{ state: 'idle' } | { state: 'edit'; id: Review['id'] }>({
    state: 'idle',
  });

  const snack = snackId && snacks.find((s) => s.id === createSnackId(parseInt(snackId)));
  if (!snack) throw new Error();

  return (
    <div>
      <SnackCard snack={snack} />
      {reviews
        .filter((review) => review.snackId === snack.id)
        .map((review) => (
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
