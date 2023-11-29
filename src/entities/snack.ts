import { type Brand, brand } from '../utils/brand';

export type Snack = {
  id: Brand<number, 'SnackId'>;
  title: Brand<string, 'SnackTitle'>;
  src: Brand<string, 'SnackSrc'>;
  rating: Brand<number, 'SnackRating'>;
};

export const createSnackId = (id?: number): Snack['id'] => brand(id ?? Date.now(), 'SnackId');
export const createSnackTitle = (title: string): Snack['title'] => {
  const trimmed = title.trim();
  if (trimmed.length < 1 || trimmed.length > 20) throw new Error();
  return brand(trimmed, 'SnackTitle');
};
export const createSnackSrc = (src: string): Snack['src'] => {
  const trimmed = src.trim();
  if (trimmed.length < 1) throw new Error();
  return brand(trimmed, 'SnackSrc');
};
export const createSnackRating = (rating: number): Snack['rating'] => {
  if (rating < 1 || rating > 5) throw new Error();
  return brand(rating, 'SnackRating');
};
