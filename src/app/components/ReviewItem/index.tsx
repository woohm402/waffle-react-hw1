import { useState } from 'react';

import { createReviewContent, type Review } from '../../../entities/review';
import { authContext } from '../../contexts/authContext';
import { serviceContext } from '../../contexts/serviceContext';
import { useMutation } from '../../hooks/useMutation';
import { useTypedContext } from '../../hooks/useTypedContext';
import { DeleteReviewModal } from '../../pages/ReviewsPage/DeleteReviewModal';
import { Button } from '../Button';
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
  const [draft, setDraft] = useState<string>();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const { myInfo } = useTypedContext(authContext);

  const { mutate: updateReview } = useUpdateReview(review.id);
  const { mutate: deleteReview } = useDeleteReview(review.id);

  return (
    <div className={styles.reviewItem} data-testid="review">
      {showProfile && <ProfileImage src={review.snack.src} />}
      <div>
        <div className={styles.reviewName}>
          <strong>{review.snack.title}</strong>
          <span>/</span>
          <b>*{review.rating.toFixed(1)}</b>
          {state.state === 'idle' ? (
            review.authorId === myInfo.id && (
              <div>
                <Button variant="primary" data-testid="edit-review" onClick={state.onStartEdit}>
                  수정
                </Button>
                <Button variant="danger" data-testid="delete-review" onClick={() => setDeleteModalOpen(true)}>
                  삭제
                </Button>
              </div>
            )
          ) : state.state === 'editing' ? (
            <div>
              <Button
                variant="primary"
                data-testid="edit-review-save"
                onClick={() => {
                  if (!draft) return;
                  updateReview({ content: createReviewContent(draft) }, { onSuccess: () => state.onEndEdit() });
                }}
              >
                저장
              </Button>
              <Button variant="third" data-testid="edit-review-cancel" onClick={state.onEndEdit}>
                취소
              </Button>
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
        onDelete={() => deleteReview(undefined, { onSuccess: () => setDeleteModalOpen(false) })}
      />
    </div>
  );
};

const useUpdateReview = (id: Review['id']) => {
  const { reviewService } = useTypedContext(serviceContext);
  return useMutation({
    mutationFn: (req: { content: Review['content'] }) => reviewService.updateReview(id, req),
  });
};

const useDeleteReview = (id: Review['id']) => {
  const { reviewService } = useTypedContext(serviceContext);
  return useMutation({
    mutationFn: () => reviewService.deleteReview(id),
  });
};
