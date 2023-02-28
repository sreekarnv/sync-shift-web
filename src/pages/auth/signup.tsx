import React from 'react';

import '@/assets/css/pages/auth.css';
import FormInput from '@/components/form-input';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useSignupMutation, {
  SignupUserInput,
} from '@/hooks/api/mutations/auth/useSignupMutation';

const SignupPage: React.FC = () => {
  const {
    formState: {},
    register,
    handleSubmit,
  } = useForm<SignupUserInput>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const { error, isLoading, mutate } = useSignupMutation();

  const onSubmit = async (data: SignupUserInput) => {
    mutate(data);
  };

  return (
    <>
      <div className="form">
        <div className="auth-container d-flex">
          <div className="container mx-auto align-self-center">
            <div className="row">
              <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-8 col-12 d-flex flex-column align-self-center mx-auto">
                <div className="card mt-3 mb-3">
                  <div className="card-body">
                    <form
                      className="row"
                      autoComplete="off"
                      onSubmit={handleSubmit(onSubmit)}
                      noValidate
                    >
                      <div className="col-md-12 mb-3">
                        <h2>Sign Up</h2>
                        <p>Enter your email and password to register</p>
                      </div>
                      {error?.response?.data?.errors && (
                        <div className="alert alert-danger mb-4">
                          <ul>
                            {error?.response?.data?.errors?.map(
                              (el: any, i: number) => {
                                return (
                                  <li key={i}>
                                    {(typeof el === 'string' && el) ||
                                      (el?.message && el.message)}
                                  </li>
                                );
                              }
                            )}
                          </ul>
                        </div>
                      )}
                      <div className="col-md-12">
                        <FormInput
                          className="add-billing-address-input"
                          label="Name"
                          {...register('name')}
                        />
                      </div>
                      <div className="col-md-12">
                        <FormInput
                          type="email"
                          label="Email"
                          {...register('email')}
                        />
                      </div>
                      <div className="col-12">
                        <FormInput
                          type="password"
                          label="Password"
                          {...register('password')}
                        />
                      </div>

                      <div className="col-12">
                        <div className="mb-4">
                          <button
                            type="submit"
                            className="btn btn-secondary w-100"
                          >
                            {isLoading ? 'LOADING...' : 'SIGN UP'}
                          </button>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="text-center">
                          <p className="mb-0">
                            Already have an account ?{' '}
                            <Link to="/auth/signin" className="text-warning">
                              Sign in
                            </Link>
                          </p>
                        </div>
                      </div>
                    </form>
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

export default SignupPage;
