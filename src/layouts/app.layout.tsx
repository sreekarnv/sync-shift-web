import useAppContext from '@/hooks/use-app-context';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AppNavbar from '@/layouts/app/app-navbar';
import AppSidebar from '@/layouts/app/app-sidebar';

const AppLayout: React.FC = () => {
  const { user } = useAppContext();

  if (!user) {
    return <Navigate to="/auth/signin" replace />;
  }

  return (
    <>
      <div className="layout-boxed">
        <AppNavbar />
        <div className="main-container" id="container">
          <AppSidebar />
          <div id="content" className="main-content">
            <div className="layout-px-spacing">
              <div className="middle-content container-xxl p-0">
                <div className="row layout-top-spacing">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppLayout;
