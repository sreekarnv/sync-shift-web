import UserProfileCard from '@/components/user-profile-card';
import useAppContext from '@/hooks/use-app-context';
import React from 'react';
import { Outlet } from 'react-router-dom';

const SetAvailabilityLayout: React.FC = () => {
  const { user } = useAppContext();

  if (!user) return <></>;

  return (
    <>
      <div id="content" className="main-content mx-auto">
        <div className="row">
          <div className="col-md-8">
            <Outlet />
          </div>
          <div className="col-md-4">
            <UserProfileCard showEdit={false} user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SetAvailabilityLayout;
