import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './app/App.tsx';
import { Loader } from './app/components/Loader/index.tsx';
import { createAuthRepository } from './infrastructures/createAuthRepository.ts';
import { createAuthService } from './infrastructures/createAuthService.ts';
import { createFetchClient } from './infrastructures/createFetchClient.ts';

const baseURL = 'https://seminar-react-api.wafflestudio.com';

const initApp = async () => {
  const rootNode = document.getElementById('root');
  if (!rootNode) throw new Error();

  const loaderReactRoot = ReactDOM.createRoot(rootNode);
  loaderReactRoot.render(
    <Loader style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />,
  );

  const apiClient = createFetchClient({ baseURL });
  const authRepository = createAuthRepository({ apiClient });
  const authService = createAuthService({ authRepository });
  const initialToken = await authService
    .getToken()
    .then((res) => res.token)
    .catch(() => null);

  loaderReactRoot.unmount();

  ReactDOM.createRoot(rootNode).render(
    <React.StrictMode>
      <App initialToken={initialToken} baseURL={baseURL} />
    </React.StrictMode>,
  );
};

initApp();
