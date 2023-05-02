import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Loader from '@/components/ui/loader';
import useAppContext from '@/hooks/use-app-context';
import IndexPage from '@/pages/app/index.page';
import SignInPage from '@/pages/auth/signin.page';
import SignupPage from '@/pages/auth/signup.page';
import MembersPage from '@/pages/app/members/members-index.page';
import ProfilePage from '@/pages/app/profile/profile-index.page';
import MembersDetailPage from '@/pages/app/members/members-detail-page';
import ProfileEditPage from '@/pages/app/profile/profile-edit-page';
import FacilitiesPage from './pages/app/facilities/facilities-index.page';
import FacilitiesDetailPage from './pages/app/facilities/facilities-detail.page';
import SetAvailabilityLayout from './layouts/availability.layout';
import SetAvailabilityIndexPage from './pages/availability-form/set-availability-index.page';

const AuthLayout = React.lazy(() => import('./layouts/auth.layout'));
const AppLayout = React.lazy(() => import('./layouts/app.layout'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <React.Suspense fallback={<Loader />}>
        <AppLayout />
      </React.Suspense>
    ),
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
      {
        path: '/members/:id',
        element: <MembersDetailPage />,
      },
      {
        path: '/members',
        element: <MembersPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/profile/edit',
        element: <ProfileEditPage />,
      },
      {
        path: '/facilities/:id',
        element: <FacilitiesDetailPage />,
      },
      {
        path: '/facilities',
        element: <FacilitiesPage />,
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
  {
    path: '/set-availability',
    element: (
      <React.Suspense fallback={<Loader />}>
        <SetAvailabilityLayout />
      </React.Suspense>
    ),
    children: [
      {
        index: true,
        element: <SetAvailabilityIndexPage />,
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
