import { createContext } from 'react';

import { type ReviewService } from '../../usecases/ReviewService';

export type ServiceContext = {
  reviewService: ReviewService;
};

export const serviceContext = createContext<ServiceContext | null>(null);
