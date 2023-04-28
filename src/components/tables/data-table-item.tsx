import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/button';
import clsx from 'clsx';
import Avatar from 'boring-avatars';

export const Profile: React.FC<{ image?: string; name: string }> = ({
  name,
}) => {
  return (
    <div className="d-flex align-items-center gap-2">
      <div className="rounded-circle profile-img table-avatar-image">
        <Avatar
          variant="beam"
          name={name}
          colors={['#92A1C6', '#146A7C', '#C271B4', '#C20D90']}
        />
      </div>
      <span>{name}</span>
    </div>
  );
};

export const Action: React.FC<{ link: string }> = ({ link }) => {
  return (
    <>
      <span className="text-center">
        <Link to={link}>
          <Button color="primary" className="btn-sm">
            View
          </Button>
        </Link>
      </span>
    </>
  );
};

export const Badge: React.FC<{
  isPrimary: boolean;
  children: React.ReactNode;
  invert?: boolean;
}> = ({ isPrimary, children, invert }) => {
  return (
    <>
      <span
        className={clsx([
          'shadow-none badge',
          isPrimary
            ? invert
              ? 'badge-success'
              : 'badge-secondary'
            : invert
            ? 'badge-danger'
            : 'badge-dark',
        ])}
      >
        {children}
      </span>
    </>
  );
};

export const DataTableItem = {
  Profile,
  Action,
  Badge,
};
