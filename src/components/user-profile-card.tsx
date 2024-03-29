import '@/assets/css/components/user-profile.css';
import FeatherCoffeeIcon from '@/components/icons/feather-coffee.icon';
import FeatherEditIcon from '@/components/icons/feather-edit.icon';
import FeatherMailIcon from '@/components/icons/feather-mail.icon';
import Button from '@/components/ui/button';
import useUserWithdrawMutation from '@/hooks/api/mutations/use-user-withdraw-mutation';
import { User } from '@/types/User';
import Avatar from 'boring-avatars';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const UserProfileCard: React.FC<{ user: User; showEdit?: boolean }> = ({
  user,
  showEdit = true,
}) => {
  const { pathname } = useLocation();
  const { mutate } = useUserWithdrawMutation();

  return (
    <>
      <div className="user-profile">
        <div className="user-content user-content-area">
          <div className="d-flex justify-content-between align-items-center px-3 py-2">
            <h3 className="">Your Details</h3>
            {showEdit && (
              <Link to="/profile/edit" className="mt-2 edit-profile">
                <FeatherEditIcon />
              </Link>
            )}
          </div>
          <div className="text-center user-info">
            <Avatar
              name={user.name}
              variant="beam"
              size={90}
              square={true}
              colors={['#92A1C6', '#146A7C', '#C271B4', '#C20D90']}
            />
            <p className="">{user.name}</p>
          </div>
          <div className="user-info-list pb-5">
            <div className="">
              <ul className="contacts-block list-unstyled">
                <li className="contacts-block__item d-flex items-center">
                  <FeatherCoffeeIcon />
                  <span className="ms-3">{user.role}</span>
                </li>
                <li className="contacts-block__item text-truncate">
                  <FeatherMailIcon />
                  <a className="ms-3" href={`mailto:${user.email}`}>
                    {user.email}
                  </a>
                </li>
                <li className="contacts-block__item text-center">
                  {user.defaultStartAvailableTime ? (
                    <p className="text-success">Is Available</p>
                  ) : (
                    <p className="text-danger"> Not Available</p>
                  )}
                </li>
                {pathname.startsWith('/profile') && (
                  <li className="mt-3">
                    <Button
                      onClick={() => {
                        mutate({});
                      }}
                      style={{ width: '100%' }}
                      color="danger"
                    >
                      Deactivate Me
                    </Button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileCard;
