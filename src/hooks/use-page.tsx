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
      path: '/members/',
      heading: 'Member Details',
    },
    {
      path: '/profile',
      heading: 'Profile',
    },
    {
      path: '/profile/edit',
      heading: 'Edit Profile',
    },
    {
      path: '/facilities',
      heading: 'Find Facilities',
    },
  ]);
  const [current, setCurrent] = React.useState<AppPage>();
  const location = useLocation();

  React.useEffect(() => {
    const route = routes.find((route) =>
      route.path.startsWith(location.pathname)
    );

    if (route) setCurrent(route);
    else {
      setCurrent({
        path: location.pathname,
        heading: 'Detail',
      });
    }
  }, [location.pathname]);

  return {
    current,
  };
};

export default useAppPage;
