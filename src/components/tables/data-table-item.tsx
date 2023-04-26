import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/button';

export const Profile: React.FC<{ image: string; name: string }> = ({
  name,
  image,
}) => {
  return (
    <div className="d-flex align-items-center gap-2">
      <img src={image} className="rounded-circle profile-img" alt="avatar" />
      <span>{name}</span>
    </div>
  );
};

export const Action: React.FC<{ userId: string }> = ({ userId }) => {
  return (
    <>
      <span className="text-center">
        <Link to={`/profile/${userId}`}>
          <Button color="primary" className="btn-sm">
            View
          </Button>
        </Link>
      </span>
    </>
  );
};

export const DataTableItem = {
  Profile,
  Action,
};
