import { type Brand, brand } from '../utils/brand';
import { type Snack } from './snack';

export type Review = {
  id: Brand<number, 'ReviewId'>;
  snack: Snack;
  rating: Brand<1 | 2 | 3 | 4 | 5, 'ReviewRating'>;
  content: Brand<string, 'ReviewContent'>;
};

export const createReviewId = (id?: number): Review['id'] => brand(id ?? Date.now(), 'ReviewId');
export const createReviewRating = (rating: number | string): Review['rating'] => {
  const ratingNumber = parseInt(`${rating}`);
  if (ratingNumber !== 1 && ratingNumber !== 2 && ratingNumber !== 3 && ratingNumber !== 4 && ratingNumber !== 5)
    throw new Error();
  return brand(ratingNumber, 'ReviewRating');
};
export const createReviewContent = (name: string): Review['content'] => {
  const trimmed = name.trim();
  if (trimmed.length < 5 || trimmed.length > 1000) throw new Error();
  return brand(trimmed, 'ReviewContent');
};
