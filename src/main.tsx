import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import '@/assets/css/base/main.css';

import '@fontsource/nunito/latin-400.css';
import '@fontsource/nunito/latin-600.css';
import '@fontsource/nunito/latin-700.css';

import Loader from '@/components/ui/loader';
import { queryClient } from '@/config/react-query';
import AppProvider from '@/providers/app-provider';
import AppRouter from '@/router';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <React.Suspense fallback={<Loader />}>
          <AppRouter />
        </React.Suspense>
      </AppProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
