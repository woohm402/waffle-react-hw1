import './index.css';

import { Review } from '../../../entities/review';

export const ReviewItem = ({
  review,
  onDeleteReview,
  state,
  onEditReview,
}: {
  review: Review;
  state:
    | { state: 'idle' }
    | {
        state: 'editing';
        draft: string;
        onChange: (e: string) => void;
        onChangeSubmit: () => void;
        onChangeCancel: () => void;
      }
    | { state: 'blocked' };
  onEditReview: () => void;
  onDeleteReview: () => void;
}) => {
  return (
    <div className="reviewItem" data-testid="review">
      <img src={review.image} className="reviewImage" />
      <div>
        <div className="reviewName">
          <strong>{review.snackName}</strong>
          <span>/</span>
          <b>*{review.rating.toFixed(1)}</b>
          {state.state === 'idle' ? (
            <div className="reviewActions">
              <button data-testid="edit-review" onClick={onEditReview}>
                수정
              </button>
              <button data-testid="delete-review" onClick={onDeleteReview}>
                삭제
              </button>
            </div>
          ) : state.state === 'editing' ? (
            <div>
              <button data-testid="edit-review-save" onClick={state.onChangeSubmit}>
                저장
              </button>
              <button data-testid="edit-review-cancel" onClick={state.onChangeCancel}>
                취소
              </button>
            </div>
          ) : null}
        </div>
        {state.state === 'editing' ? (
          <textarea
            data-testid="edit-review-content-input"
            className="reviewContent"
            value={state.draft}
            onChange={(e) => state.onChange(e.target.value)}
          />
        ) : (
          <p className="reviewContent">{review.content}</p>
        )}
      </div>
    </div>
  );
};