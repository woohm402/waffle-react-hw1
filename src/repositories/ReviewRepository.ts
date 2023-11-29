import { type Review } from '../entities/review';
import { type Snack } from '../entities/snack';

export type ReviewRepository = {
  listReviews: (req: Partial<{ snackId: Snack['id'] }>) => Promise<Review[]>;
  createReview: (review: Pick<Review, 'content' | 'rating'> & { snackId: Snack['id'] }) => Promise<Review>;
  deleteReview: (reviewId: Review['id']) => Promise<void>;
  updateReview: (reviewId: Review['id'], review: Pick<Review, 'content'>) => Promise<void>;
};
