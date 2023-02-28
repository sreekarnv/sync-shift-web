import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';

import '@/assets/css/light/main.css';
import '@/assets/css/dark/main.css';

import '@fontsource/nunito/latin-400.css';
import '@fontsource/nunito/latin-600.css';
import '@fontsource/nunito/latin-700.css';

import AppRouter from './router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './config/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AppProvider from './providers/app-provider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <AppRouter />
      </AppProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
