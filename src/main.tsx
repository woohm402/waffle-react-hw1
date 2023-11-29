import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/App.tsx';
import { createReviewService } from './infrastructures/createReviewService.ts';
import { serviceContext } from './app/contexts/serviceContext.ts';

const reviewService = createReviewService();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <serviceContext.Provider value={{ reviewService }}>
      <App />
    </serviceContext.Provider>
  </React.StrictMode>,
);
