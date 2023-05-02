import React from 'react';

import FormInput from '@/components/forms/form-input';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useSignupMutation, {
  SignupUserInput,
} from '@/hooks/api/mutations/use-signup-mutation';
import FormError from '@/components/forms/form-error';
import Button from '@/components/ui/button';
import { FormRadio, FormRadioGroup } from '@/components/forms/form-radio';

const SignupPage: React.FC = () => {
  const { register, handleSubmit } = useForm<SignupUserInput>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'STUDENT',
    },
  });

  const { error, isLoading, mutate } = useSignupMutation();

  return (
    <>
      <form
        className="row"
        autoComplete="off"
        onSubmit={handleSubmit((data) => {
          mutate(data);
        })}
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
        <div className="col-12 mb-1">
          <FormRadioGroup name="role">
            {[
              {
                label: 'Student',
                id: 'student',
                value: 'STUDENT',
              },
              {
                label: 'Staff',
                id: 'staff',
                value: 'STAFF',
              },
            ].map((item) => {
              return (
                <FormRadio {...register('role')} {...item} key={item.id} />
              );
            })}
          </FormRadioGroup>
        </div>

        <div className="col-12">
          <div className="mb-4">
            <Button
              isLoading={isLoading}
              color="secondary"
              type="submit"
              className="w-100"
            >
              SIGN UP
            </Button>
          </div>
        </div>

        <div className="col-12">
          <div className="text-center">
            <p className="mb-0">
              Already have an account ?{' '}
              <Link to="/auth/signin" className="text-primary">
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
