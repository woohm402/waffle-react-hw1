import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './app/App.tsx';
import { createAuthRepository } from './clients/infrastructures/createAuthRepository.ts';
import { createAuthService } from './clients/infrastructures/createAuthService.ts';
import { createFetchClient } from './clients/infrastructures/createFetchClient.ts';

const baseURL = 'https://seminar-react-api.wafflestudio.com';

const initApp = async () => {
  const apiClient = createFetchClient({ baseURL });
  const authRepository = createAuthRepository({ apiClient });
  const authService = createAuthService({ authRepository });
  const initialToken = await authService
    .getToken()
    .then((res) => res.token)
    .catch(() => null);

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App initialToken={initialToken} baseURL={baseURL} />
    </React.StrictMode>,
  );
};

initApp();
