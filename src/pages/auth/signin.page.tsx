import Button from '@/components/ui/button';
import FormError from '@/components/forms/form-error';
import FormInput from '@/components/forms/form-input';
import useSigninMutation, {
  SigninUserInput,
} from '@/hooks/api/mutations/auth/use-signin-mutation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const SignInPage: React.FC = () => {
  const { error, isLoading, mutate } = useSigninMutation();

  const { register, handleSubmit } = useForm<SigninUserInput>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <>
      <form
        className="row"
        onSubmit={handleSubmit((data) => mutate(data))}
        noValidate
      >
        <div className="col-md-12 mb-3">
          <h2>Sign In</h2>
          <p>Enter your email and password to login</p>
        </div>

        <FormError error={error} />

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
            <Button
              isLoading={isLoading}
              type="submit"
              color="secondary"
              className="w-100"
            >
              SIGN IN
            </Button>
          </div>
        </div>

        <div className="col-12">
          <div className="text-center">
            <p className="mb-0">
              Dont't have an account ?{' '}
              <Link to="/auth/signup" className="text-primary">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignInPage;
