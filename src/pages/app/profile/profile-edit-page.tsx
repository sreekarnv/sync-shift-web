// import FormError from '@/components/forms/form-error';
import FormError from '@/components/forms/form-error';
import FormInput from '@/components/forms/form-input';
import Button from '@/components/ui/button';
import UserProfileCard from '@/components/user-profile-card';
import useUpdatePasswordMutation from '@/hooks/api/mutations/use-update-password-mutation';
import useAppContext from '@/hooks/use-app-context';
import React from 'react';
import { useForm } from 'react-hook-form';

type UpdatePasswordInput = {
  oldPassword: string;
  newPassword: string;
};

const ProfileEditPage: React.FC = () => {
  const { register, handleSubmit } = useForm<UpdatePasswordInput>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
  });

  const { error, mutate } = useUpdatePasswordMutation();

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
                mutate(data);
              })}
              noValidate
            >
              <div className="col-md-12 mb-3">
                <h2>Update Password Details</h2>
                <p>Enter your current password and new password to continue</p>
              </div>

              <FormError error={error} />

              <div className="col-md-12">
                <FormInput
                  className="add-billing-address-input"
                  label="Current Password"
                  type="password"
                  id="oldPassword"
                  {...register('oldPassword')}
                />
              </div>
              <div className="col-md-12">
                <FormInput
                  type="password"
                  label="New Password"
                  id="newPassword"
                  {...register('newPassword')}
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
