import { createReviewContent, createReviewRating, type Review } from '../../entities/review';
import { type Snack } from '../../entities/snack';
import { type ReviewRepository } from '../../repositories/ReviewRepository';
import { type ReviewService } from '../../usecases/ReviewService';

export const createReviewService = ({ reviewRepository }: { reviewRepository: ReviewRepository }): ReviewService => {
  return {
    listReviews: async (req) => reviewRepository.listReviews(req),
    createReview: async (req) => reviewRepository.createReview(req),
    updateReview: async (reviewId, review) => reviewRepository.updateReview(reviewId, review),
    deleteReview: async (reviewId) => reviewRepository.deleteReview(reviewId),

    validateReview: (reviewForm, snacks) => {
      type Invalid = { message: string; valid: false };

      const snackTitleResult = ((): { valid: true; snackId: Snack['id'] } | Invalid => {
        try {
          const snack = snacks.find((s) => s.title === reviewForm.snackTitle);
          if (!snack) throw new Error();
          return { valid: true, snackId: snack.id } as const;
        } catch (err) {
          const message = '첫글자와 끝글자가 공백이 아닌 1~20자 문자열로 써주세요';
          return { valid: false, message } as const;
        }
      })();

      const contentResult = ((): { valid: true; content: Review['content'] } | Invalid => {
        try {
          if (!reviewForm.content) throw new Error();
          const content = createReviewContent(reviewForm.content);
          return { valid: true, content };
        } catch (err) {
          const message = '첫글자와 끝글자가 공백이 아닌 5~1000자 문자열로 써주세요';
          return { valid: false, message };
        }
      })();

      const ratingResult = ((): { valid: true; rating: Review['rating'] } | Invalid => {
        try {
          if (!reviewForm.rating) throw new Error();
          return { valid: true, rating: createReviewRating(reviewForm.rating) };
        } catch (err) {
          return { valid: false, message: '평점은 1 ~ 5 사이의 숫자로 써주세요' };
        }
      })();

      if (snackTitleResult.valid && contentResult.valid && ratingResult.valid)
        return {
          valid: true,
          review: { snackId: snackTitleResult.snackId, content: contentResult.content, rating: ratingResult.rating },
        };

      return {
        valid: false,
        errors: {
          ...(snackTitleResult.valid ? {} : { snackTitle: snackTitleResult.message }),
          ...(contentResult.valid ? {} : { content: contentResult.message }),
          ...(ratingResult.valid ? {} : { rating: ratingResult.message }),
        },
      };
    },
  };
};
