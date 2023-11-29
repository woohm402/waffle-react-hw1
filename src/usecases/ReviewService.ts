import { type Review } from '../entities/review';
import { type Snack } from '../entities/snack';

export type ReviewService = {
  listReviews: (req: Partial<{ snackId: Snack['id'] }>) => Promise<Review[]>;
  createReview: (req: Pick<Review, 'content' | 'rating'> & { snackId: Snack['id'] }) => Promise<Review>;
  updateReview: (reviewId: Review['id'], review: Pick<Review, 'content'>) => Promise<void>;
  deleteReview: (reviewId: Review['id']) => Promise<void>;

  validateReview: (
    reviewForm: Partial<{ snackTitle: string; rating: string; content: string }>,
    snacks: Snack[],
  ) =>
    | {
        valid: false;
        errors: Partial<{ snackTitle: string; rating: string; content: string }>;
      }
    | { valid: true; review: Pick<Review, 'content' | 'rating'> & { snackId: Snack['id'] } };
};
