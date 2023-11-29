import {
  createReviewContent,
  createReviewId,
  createReviewImage,
  createReviewRating,
  createReviewSnackName,
  type Review,
} from '../entities/review';
import { type ReviewService } from '../usecases/ReviewService';

export const createReviewService = (): ReviewService => {
  return {
    validateReview: (reviewForm) => {
      type ValidationResult<T extends keyof Review> =
        | { valid: false; message: string }
        | ({ valid: true } & Record<T, Review[T]>);

      const imageResult = ((): ValidationResult<'image'> => {
        try {
          return { valid: true, image: createReviewImage(reviewForm.image) };
        } catch (err) {
          return { valid: false, message: '' } as const;
        }
      })();

      const snackNameResult = ((): ValidationResult<'snackName'> => {
        try {
          if (!reviewForm.snackName) throw new Error();
          return {
            valid: true,
            snackName: createReviewSnackName(reviewForm.snackName),
          };
        } catch (err) {
          return {
            valid: false,
            message: '첫글자와 끝글자가 공백이 아닌 1~20자 문자열로 써주세요',
          };
        }
      })();

      const contentResult = ((): ValidationResult<'content'> => {
        try {
          if (!reviewForm.content) throw new Error();
          return {
            valid: true,
            content: createReviewContent(reviewForm.content),
          };
        } catch (err) {
          return {
            valid: false,
            message: '첫글자와 끝글자가 공백이 아닌 5~1000자 문자열로 써주세요',
          };
        }
      })();

      const ratingResult = ((): ValidationResult<'rating'> => {
        try {
          if (!reviewForm.rating) throw new Error();
          return { valid: true, rating: createReviewRating(reviewForm.rating) };
        } catch (err) {
          return {
            valid: false,
            message: '평점은 1 ~ 5 사이의 숫자로 써주세요',
          };
        }
      })();

      if (imageResult.valid && snackNameResult.valid && contentResult.valid && ratingResult.valid) {
        return {
          valid: true,
          review: {
            id: createReviewId(),
            image: imageResult.image,
            snackName: snackNameResult.snackName,
            content: contentResult.content,
            rating: ratingResult.rating,
          },
        };
      }

      return {
        valid: false,
        errors: {
          ...(imageResult.valid ? {} : { image: imageResult.message }),
          ...(snackNameResult.valid ? {} : { snackName: snackNameResult.message }),
          ...(contentResult.valid ? {} : { content: contentResult.message }),
          ...(ratingResult.valid ? {} : { rating: ratingResult.message }),
        },
      };
    },
  };
};
