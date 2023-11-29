import { createContext } from 'react';

import { type Review } from '../../entities/review';
import { type Snack } from '../../entities/snack';

export type StoreContext = {
  reviews: Review[];

  createReview: (review: Omit<Review, 'id'>) => void;
  updateReview: (id: Review['id'], review: Partial<Omit<Review, 'id'>>) => void;
  deleteReview: (id: Review['id']) => void;

  snacks: Snack[];

  createSnack: (snack: Omit<Snack, 'id'>) => Snack;
};

export const storeContext = createContext<StoreContext | null>(null);
