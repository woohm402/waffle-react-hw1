import './reset.css';
import './App.css';

import { useState } from 'react';

import { createReviewContent, type Review } from '../entities/review';
import { type Snack } from '../entities/snack';
import { AddReviewModal } from './components/AddReviewModal';
import { DeleteReviewModal } from './components/DeleteReviewModal';
import { ReviewItem } from './components/ReviewItem';
import { storeContext } from './contexts/storeContext';

export const App = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [snacks] = useState<Snack[]>([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [reviewState, setReviewState] = useState<
    { state: 'idle' } | { state: 'edit'; id: number; draft: string } | { state: 'delete'; id: number }
  >({ state: 'idle' });

  return (
    <storeContext.Provider value={{ reviews, snacks }}>
      <div className="wrapper">
        <header data-testid="header" className="header">
          <a href="https://wafflestudio.com">
            <img
              className="logo"
              src="https://www.wafflestudio.com/static/images/logo/waffle_logo_title.png"
              data-testid="waffle-logo"
              alt="와플스튜디오"
            />
            <h1 className="title" data-testid="header-title">
              과자 리뷰
            </h1>
          </a>
        </header>
        <ul className="reviewList" data-testid="review-list">
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
                        const newReview = {
                          ...review,
                          content: createReviewContent(reviewState.draft),
                        };
                        setReviews(reviews.map((r) => (r.id === review.id ? newReview : r)));
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
        <button data-testid="write-review" className="addModal" onClick={() => setAddModalOpen(true)}>
          +
        </button>
        <AddReviewModal
          isOpen={isAddModalOpen}
          onClose={() => setAddModalOpen(false)}
          onAddReview={(newReview) => setReviews([newReview, ...reviews])}
        />
        <DeleteReviewModal
          reviewItem={reviewState.state === 'delete' ? reviews.find((r) => r.id === reviewState.id) ?? null : null}
          onClose={() => setReviewState({ state: 'idle' })}
          onDelete={() => {
            if (reviewState.state !== 'delete') return;

            setReviews(reviews.filter((r) => r.id !== reviewState.id));
            setReviewState({ state: 'idle' });
          }}
        />
      </div>
    </storeContext.Provider>
  );
};
