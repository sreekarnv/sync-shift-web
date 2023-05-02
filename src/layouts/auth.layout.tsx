import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import '@/assets/css/pages/auth.css';
import useAppContext from '@/hooks/use-app-context';

const AuthLayout: React.FC = () => {
  const { user } = useAppContext();

  if (user && user.defaultStartAvailableTime) {
    return <Navigate to="/" replace />;
  } else if (user && !user.defaultEndAvailableTime) {
    return <Navigate to="/set-availability" replace />;
  }

  return (
    <>
      <div className="form">
        <div className="auth-container d-flex">
          <div className="container mx-auto align-self-center">
            <div className="row">
              <div className="col-6 d-lg-flex d-none h-100 my-auto top-0 start-0 text-center justify-content-center flex-column">
                <div className="auth-cover-bg-image"></div>
                <div className="auth-overlay"></div>

                <div className="auth-cover">
                  <div className="position-relative">
                    <img src="/images/auth.svg" alt="auth-img" />

                    <h2 className="mt-5 text-white font-weight-bolder px-2">
                      Join the community for Bitsians
                    </h2>
                    <p className="text-white px-2">
                      Easily connect with community members and look for
                      availability of services.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-8 col-12 d-flex flex-column align-self-center ms-lg-auto me-lg-0 mx-auto">
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
