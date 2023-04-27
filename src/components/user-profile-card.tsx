import React from 'react';
import '@/assets/css/components/user-profile.css';
import { Link } from 'react-router-dom';
import FeatherEditIcon from './icons/feather-edit.icon';
import Avatar from 'boring-avatars';
import { User } from '@/providers/app-provider';

const UserProfileCard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <>
      <div className="user-profile">
        <div className="user-content user-content-area">
          <div className="d-flex justify-content-between align-items-center px-3 py-2">
            <h3 className="">Your Details</h3>
            <Link to="/profile/edit" className="mt-2 edit-profile">
              <FeatherEditIcon />
            </Link>
          </div>
          <div className="text-center user-info">
            <Avatar
              name={user.name}
              variant="beam"
              size={100}
              square={true}
              colors={['#92A1C6', '#146A7C', '#C271B4', '#C20D90']}
            />
            {/* <img src="/images/profile.jpeg" alt="avatar" /> */}
            <p className="">{user.name}</p>
          </div>
          <div className="user-info-list pb-5">
            <div className="">
              <ul className="contacts-block list-unstyled">
                <li className="contacts-block__item d-flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-coffee me-3"
                  >
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                    <line x1="6" y1="1" x2="6" y2="4"></line>
                    <line x1="10" y1="1" x2="10" y2="4"></line>
                    <line x1="14" y1="1" x2="14" y2="4"></line>
                  </svg>{' '}
                  {user.role}
                </li>
                <li className="contacts-block__item text-truncate">
                  <a href={`mailto:${user.email}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-mail me-3"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    {user.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileCard;
