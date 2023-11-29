import { type Review } from '../entities/review';
import { type Snack } from '../entities/snack';

export type ReviewService = {
  validateReview: (
    reviewForm: Partial<{ snackTitle: string; rating: string; content: string }>,
    snacks: Snack[],
  ) =>
    | {
        valid: false;
        errors: Partial<{ snackTitle: string; rating: string; content: string }>;
      }
    | { valid: true; review: Omit<Review, 'id'> };
};
