import './reset.css';

import { useCallback, useMemo, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { createReviewId, type Review } from '../entities/review';
import { createSnackId, type Snack } from '../entities/snack';
import { createAuthRepository } from '../infrastructures/createAuthRepository';
import { createAuthService } from '../infrastructures/createAuthService';
import { createFetchClient } from '../infrastructures/createFetchClient';
import { createReviewService } from '../infrastructures/createReviewService';
import { Layout } from './components/Layout';
import { serviceContext } from './contexts/serviceContext';
import { storeContext } from './contexts/storeContext';
import { LoginPage } from './pages/LoginPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { SnackCreatePage } from './pages/SnackCreatePage';
import { SnacksPage } from './pages/SnacksPage';
import { SnackViewPage } from './pages/SnackViewPage';

export const App = ({ initialToken, baseURL }: { initialToken: string | null; baseURL: string }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [snacks, setSnacks] = useState<Snack[]>([]);
  const [token, setToken] = useState<string | null>(initialToken);

  const createReview = useCallback(
    (data: Omit<Review, 'id'>) => setReviews((reviews) => [{ ...data, id: createReviewId() }, ...reviews]),
    [],
  );
  const updateReview = useCallback(
    (id: Review['id'], data: Partial<Omit<Review, 'id'>>) =>
      setReviews((reviews) => reviews.map((r) => (r.id === id ? { ...r, ...data } : r))),
    [],
  );
  const deleteReview = useCallback(
    (id: Review['id']) => setReviews((reviews) => reviews.filter((r) => r.id !== id)),
    [],
  );
  const createSnack = useCallback((data: Omit<Snack, 'id'>) => {
    const newSnack = { ...data, id: createSnackId() };
    setSnacks((snacks) => [newSnack, ...snacks]);
    return newSnack;
  }, []);

  const services = useMemo(() => {
    const apiClient = createFetchClient({
      baseURL,
      headers: token === null ? undefined : { authorization: `Bearer ${token}` },
    });
    const authRepository = createAuthRepository({ apiClient });
    const authService = createAuthService({ authRepository });
    const reviewService = createReviewService();
    return { reviewService, authService };
  }, [baseURL, token]);

  const router = createBrowserRouter(
    token === null
      ? [{ path: '*', element: <LoginPage authService={services.authService} setToken={setToken} /> }]
      : [
          {
            path: '/',
            element: <Layout />,
            children: [
              { path: '/', element: <ReviewsPage /> },
              { path: '/snacks', element: <SnacksPage /> },
              { path: '/snacks/new', element: <SnackCreatePage /> },
              { path: '/snacks/:snackId', element: <SnackViewPage /> },
            ],
          },
          { path: '*', element: <div>404</div> },
        ],
  );

  return (
    <serviceContext.Provider value={services}>
      <storeContext.Provider value={{ reviews, createReview, updateReview, deleteReview, snacks, createSnack }}>
        <RouterProvider router={router} />
      </storeContext.Provider>
    </serviceContext.Provider>
  );
};
