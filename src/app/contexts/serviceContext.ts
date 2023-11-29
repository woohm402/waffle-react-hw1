import { createContext, useContext } from 'react';

import { type ReviewService } from '../../usecases/ReviewService';

export type ServiceContext = {
  reviewService: ReviewService;
};

export const serviceContext = createContext<ServiceContext | null>(null);

export const useServiceContext = (): ServiceContext => {
  const context = useContext(serviceContext);
  if (context === null) throw new Error();
  return context;
};
