import React from 'react';

interface ProfilePageProps extends React.PropsWithChildren {}

const ProfilePage: React.FC<ProfilePageProps> = ({}) => {
  return (
    <>
      <div>
        <h1>User Profile Goes Here</h1>
      </div>
    </>
  );
};

export default ProfilePage;
