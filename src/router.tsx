import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Loader from './components/ui/loader';
import useAppContext from './hooks/use-app-context';
import IndexPage from './pages/app';
import AppLayout from './pages/app.layout';
import SignInPage from './pages/auth/signin';
import SignupPage from './pages/auth/signup';

const AuthLayout = React.lazy(() => import('./pages/auth.layout'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
    ],
  },
  {
    path: '/auth',
    element: (
      <React.Suspense fallback={<Loader />}>
        <AuthLayout />
      </React.Suspense>
    ),
    children: [
      {
        path: 'signin',
        element: <SignInPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
    ],
  },
]);

const AppRouter: React.FC = () => {
  const { loadJwtFromStorage, isLoading } = useAppContext();

  React.useEffect(() => {
    loadJwtFromStorage();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return <RouterProvider router={router} />;
};

export default AppRouter;
