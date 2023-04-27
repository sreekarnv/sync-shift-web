import React from 'react';
import { useLocation } from 'react-router-dom';

export interface AppPage {
  path: string;
  heading: string;
}

const useAppPage = () => {
  const [routes] = React.useState<AppPage[]>([
    {
      path: '/',
      heading: 'Your Schedule',
    },
    {
      path: '/members',
      heading: 'Find Members',
    },
    {
      path: '/profile',
      heading: 'Profile',
    },
    {
      path: '/facilities',
      heading: 'Find Facilities',
    },
  ]);
  const [current, setCurrent] = React.useState<AppPage>();
  const location = useLocation();

  React.useEffect(() => {
    const route = routes.find((route) => route.path === location.pathname);
    if (route) setCurrent(route);
  }, [location.pathname]);

  return {
    current,
  };
};

export default useAppPage;
