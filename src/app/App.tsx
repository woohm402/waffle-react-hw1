import './reset.css';

import { useCallback, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { createReviewId, type Review } from '../entities/review';
import { type Snack } from '../entities/snack';
import { Layout } from './components/Layout';
import { storeContext } from './contexts/storeContext';
import { ReviewPage } from './pages/ReviewPage';

export const App = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [snacks] = useState<Snack[]>([]);

  const router = createBrowserRouter([
    { path: '/', element: <ReviewPage /> },
    { path: '*', element: <div>404</div> },
  ]);

  return (
    <storeContext.Provider
      value={{
        reviews,
        snacks,
        updateReview: useCallback(
          (id: Review['id'], data: Partial<Omit<Review, 'id'>>) =>
            setReviews((reviews) => reviews.map((r) => (r.id === id ? { ...r, ...data } : r))),
          [],
        ),
        createReview: useCallback(
          (data: Omit<Review, 'id'>) => setReviews((reviews) => [{ ...data, id: createReviewId() }, ...reviews]),
          [],
        ),
        deleteReview: useCallback(
          (id: Review['id']) => setReviews((reviews) => reviews.filter((r) => r.id !== id)),
          [],
        ),
      }}
    >
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </storeContext.Provider>
  );
};
