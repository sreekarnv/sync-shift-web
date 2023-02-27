import React from 'react';
import { Outlet } from 'react-router-dom';

interface AuthLayoutPageProps extends React.PropsWithChildren {}

const AuthLayout: React.FC<AuthLayoutPageProps> = ({}) => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthLayout;
