import React from 'react';

import FormInput from '@/components/form-input';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useSignupMutation, {
  SignupUserInput,
} from '@/hooks/api/mutations/auth/use-signup-mutation';
import FormError from '@/components/form-error';

const SignupPage: React.FC = () => {
  const { register, handleSubmit } = useForm<SignupUserInput>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const { error, isLoading, mutate } = useSignupMutation();

  return (
    <>
      <form
        className="row"
        autoComplete="off"
        onSubmit={handleSubmit((data) => mutate(data))}
        noValidate
      >
        <div className="col-md-12 mb-3">
          <h2>Sign Up</h2>
          <p>Enter your email and password to register</p>
        </div>

        <FormError error={error} />

        <div className="col-md-12">
          <FormInput
            className="add-billing-address-input"
            label="Name"
            {...register('name')}
          />
        </div>
        <div className="col-md-12">
          <FormInput type="email" label="Email" {...register('email')} />
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
            <button type="submit" className="btn btn-secondary w-100">
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
    </>
  );
};

export default SignupPage;
