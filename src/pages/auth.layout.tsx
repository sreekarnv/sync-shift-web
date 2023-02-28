import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import '@/assets/css/pages/auth.css';
import useAppContext from '@/hooks/use-app-context';

const AuthLayout: React.FC = () => {
  const { user } = useAppContext();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <div className="form">
        <div className="auth-container d-flex">
          <div className="container mx-auto align-self-center">
            <div className="row">
              <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-8 col-12 d-flex flex-column align-self-center mx-auto">
                <div className="card mt-3 mb-3">
                  <div className="card-body">
                    <Outlet />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
