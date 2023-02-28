import useAppContext from '@/hooks/use-app-context';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AppLayout: React.FC = () => {
  const { user } = useAppContext();

  if (!user) {
    return <Navigate to="/auth/signin" replace />;
  }

  return <Outlet />;
};

export default AppLayout;
