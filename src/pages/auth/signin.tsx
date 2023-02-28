import React from 'react';
import { Link } from 'react-router-dom';

interface SignInPageProps extends React.PropsWithChildren {}

const SignInPage: React.FC<SignInPageProps> = ({}) => {
  return (
    <>
      <div className="row">
        <div className="col-md-12 mb-3">
          <h2>Sign In</h2>
          <p>Enter your email and password to login</p>
        </div>
        <div className="col-md-12">
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" />
          </div>
        </div>
        <div className="col-12">
          <div className="mb-4">
            <label className="form-label">Password</label>
            <input type="text" className="form-control" />
          </div>
        </div>

        <div className="col-12">
          <div className="mb-4">
            <button className="btn btn-secondary w-100">SIGN IN</button>
          </div>
        </div>

        <div className="col-12">
          <div className="text-center">
            <p className="mb-0">
              Dont't have an account ?{' '}
              <Link to="/auth/signup" className="text-warning">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
