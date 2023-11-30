import { createContext } from 'react';

import { type ReviewService } from '../../usecases/ReviewService';
import { type SnackService } from '../../usecases/SnackService';

export const serviceContext = createContext<{ reviewService: ReviewService; snackService: SnackService } | null>(null);
