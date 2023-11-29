import { Review } from "../entities/review";

export type ReviewService = {
  validateReview: (
    reviewForm: Omit<Partial<Record<keyof Review, string>>, "id">
  ) =>
    | {
        valid: false;
        errors: Omit<Partial<Record<keyof Review, string>>, "id">;
      }
    | { valid: true; review: Review };
};
