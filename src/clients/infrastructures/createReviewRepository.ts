import { createReviewContent, createReviewId, createReviewRating } from '../../entities/review';
import { createSnackId, createSnackSrc, createSnackTitle } from '../../entities/snack';
import { type ReviewRepository } from '../../repositories/ReviewRepository';
import { type ApiClient } from '../ApiClient';

export const createReviewRepository = ({ apiClient }: { apiClient: ApiClient }): ReviewRepository => {
  return {
    listReviews: async (req) => {
      const params = new URLSearchParams();

      if (req.snackId) params.append('snack', req.snackId.toString());

      const { data } = await apiClient.get<
        {
          id: number;
          content: string;
          rating: number;
          created_at: string;
          updated_at: string;
          snack: {
            id: number;
            name: string;
            image: string;
            rating: number;
            created_at: string;
            updated_at: string;
            author: { id: number; username: string; created_at: string; updated_at: string };
          };
        }[]
      >(`/reviews?${params}`);

      return data.map((review) => ({
        id: createReviewId(review.id),
        content: createReviewContent(review.content),
        rating: createReviewRating(review.rating),
        snack: {
          id: createSnackId(review.snack.id),
          title: createSnackTitle(review.snack.name),
          src: createSnackSrc(review.snack.image),
        },
      }));
    },

    createReview: async (review) => {
      const { data } = await apiClient.post<{
        id: number;
        content: string;
        rating: number;
        created_at: string;
        updated_at: string;
        snack: {
          id: number;
          name: string;
          image: string;
          rating: number;
          created_at: string;
          updated_at: string;
          author: { id: number; username: string; created_at: string; updated_at: string };
        };
      }>('/reviews', review);

      return {
        id: createReviewId(data.id),
        content: createReviewContent(data.content),
        rating: createReviewRating(data.rating),
        snack: {
          id: createSnackId(data.snack.id),
          title: createSnackTitle(data.snack.name),
          src: createSnackSrc(data.snack.image),
        },
      };
    },

    deleteReview: async (reviewId) => {
      await apiClient.delete(`/reviews/${reviewId}`);
    },

    updateReview: async (reviewId, review) => {
      await apiClient.patch(`/reviews/${reviewId}`, review);
    },
  };
};
