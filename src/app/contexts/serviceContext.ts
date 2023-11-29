import { createContext } from 'react';

import { type ReviewService } from '../../usecases/ReviewService';
import { type SnackService } from '../../usecases/SnackService';

export type ServiceContext = {
  reviewService: ReviewService;
  snackService: SnackService;
};

export const serviceContext = createContext<ServiceContext | null>(null);
