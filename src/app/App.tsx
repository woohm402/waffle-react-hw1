import './reset.css';

import { useCallback, useMemo, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { createAuthRepository } from '../infrastructures/createAuthRepository';
import { createAuthService } from '../infrastructures/createAuthService';
import { createFetchClient } from '../infrastructures/createFetchClient';
import { createReviewRepository } from '../infrastructures/createReviewRepository';
import { createReviewService } from '../infrastructures/createReviewService';
import { createSnackRepository } from '../infrastructures/createSnackRepository';
import { createSnackService } from '../infrastructures/createSnackService';
import { CenterLoader } from './components/CenterLoader';
import { Layout } from './components/Layout';
import { authContext } from './contexts/authContext';
import { serviceContext } from './contexts/serviceContext';
import { useQuery } from './hooks/useQuery';
import { LoginPage } from './pages/LoginPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { SnackCreatePage } from './pages/SnackCreatePage';
import { SnacksPage } from './pages/SnacksPage';
import { SnackViewPage } from './pages/SnackViewPage';

export const App = ({ initialToken, baseURL }: { initialToken: string | null; baseURL: string }) => {
  const [token, setToken] = useState<string | null>(initialToken);

  const services = useMemo(() => {
    const apiClient = createFetchClient({
      baseURL,
      headers: token === null ? undefined : { authorization: `Bearer ${token}` },
    });
    const authRepository = createAuthRepository({ apiClient });
    const authService = createAuthService({ authRepository });
    const reviewRepository = createReviewRepository({ apiClient });
    const reviewService = createReviewService({ reviewRepository });
    const snackRepository = createSnackRepository({ apiClient });
    const snackService = createSnackService({ snackRepository });
    return { reviewService, authService, snackService };
  }, [baseURL, token]);

  const { data: myInfo } = useQuery({
    queryFn: useCallback(() => services.authService.getMyInfo(), [services]),
    enabled: token !== null,
  });

  if (token === null)
    return (
      <RouterProvider
        router={createBrowserRouter([
          { path: '*', element: <LoginPage authService={services.authService} setToken={setToken} /> },
        ])}
      />
    );

  if (myInfo === undefined)
    return (
      <RouterProvider
        router={createBrowserRouter([
          { path: '*', element: <Layout />, children: [{ path: '*', element: <CenterLoader /> }] },
        ])}
      />
    );

  return (
    <serviceContext.Provider value={services}>
      <authContext.Provider value={{ myInfo }}>
        <RouterProvider
          router={createBrowserRouter([
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
          ])}
        />
      </authContext.Provider>
    </serviceContext.Provider>
  );
};
