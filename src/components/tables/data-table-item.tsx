import React from 'react';

export const Profile: React.FC = () => {
  return (
    <div className="d-flex align-items-center gap-2">
      <img
        src="/images/profile.jpeg"
        className="rounded-circle profile-img"
        alt="avatar"
      />
      <span>Linda Nelson</span>
    </div>
  );
};

export const Status: React.FC = () => {
  return <></>;
};

export const Action: React.FC = () => {
  return <></>;
};
