import './reset.css';

import { useCallback, useEffect, useMemo, useState } from 'react';
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

const baseURL = 'https://seminar-react-api.wafflestudio.com';

export const App = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [snacks, setSnacks] = useState<Snack[]>([]);
  const [token, setToken] = useState<string | null>();

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

  const authService = useMemo(() => {
    const apiClient = createFetchClient({ baseURL });
    const authRepository = createAuthRepository({ apiClient });
    return createAuthService({ authRepository });
  }, []);

  useEffect(() => {
    if (token) return;

    authService
      .getToken()
      .then(({ token }) => setToken(token))
      .catch(() => setToken(null));
  }, [authService, token]);

  if (token === undefined) return <div>loading...</div>;

  if (token === null) return <LoginPage authService={authService} onLoginSuccess={(token) => setToken(token)} />;

  const reviewService = createReviewService();

  return (
    <serviceContext.Provider value={{ reviewService }}>
      <storeContext.Provider value={{ reviews, createReview, updateReview, deleteReview, snacks, createSnack }}>
        <RouterProvider router={router} />
      </storeContext.Provider>
    </serviceContext.Provider>
  );
};

const router = createBrowserRouter([
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
]);
