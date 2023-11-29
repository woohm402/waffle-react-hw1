import { createContext } from 'react';

import { type Review } from '../../entities/review';
import { type Snack } from '../../entities/snack';

export type StoreContext = {
  reviews: Review[];
  snacks: Snack[];
};

export const storeContext = createContext<StoreContext | null>(null);
