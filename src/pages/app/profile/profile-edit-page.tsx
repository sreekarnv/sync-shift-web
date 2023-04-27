// import FormError from '@/components/forms/form-error';
import FormInput from '@/components/forms/form-input';
import Button from '@/components/ui/button';
import UserProfileCard from '@/components/user-profile-card';
import useAppContext from '@/hooks/use-app-context';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

type UpdatePasswordInput = {
  currentPassword: string;
  password: string;
  confirmPassword: string;
};

const ProfileEditPage: React.FC = () => {
  const { register, handleSubmit } = useForm<UpdatePasswordInput>({
    defaultValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { user } = useAppContext();

  return (
    <>
      <div>
        <div className="row">
          <div className="col-md-9">
            <form
              className="row"
              autoComplete="off"
              onSubmit={handleSubmit((data) => {
                console.log(data);
              })}
              noValidate
            >
              <div className="col-md-12 mb-3">
                <h2>Update Password Details</h2>
                <p>Enter your current password and new password to continue</p>
              </div>

              {/* <FormError error={error} /> */}

              <div className="col-md-12">
                <FormInput
                  className="add-billing-address-input"
                  label="Current Password"
                  type="password"
                  id="currentPassword"
                  {...register('currentPassword')}
                />
              </div>
              <div className="col-md-12">
                <FormInput
                  type="password"
                  label="password"
                  id="password"
                  {...register('password')}
                />
              </div>
              <div className="col-12">
                <FormInput
                  type="password"
                  label="Confirm Password"
                  id="confirmPassword"
                  {...register('confirmPassword')}
                />
              </div>

              <div className="col-12">
                <div className="mb-4">
                  <Button color="secondary" type="submit" className="w-100">
                    Update Password
                  </Button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-3">
            {user && <UserProfileCard showEdit={false} user={user} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileEditPage;
