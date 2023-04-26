import FeatherLogoutIcon from '@/components/icons/feather-logout-icon';
import FeatherUserIcon from '@/components/icons/feather-user-icon';
import useAppContext from '@/hooks/use-app-context';
import useAppPage from '@/hooks/use-page';
import Avatar from 'boring-avatars';
import React from 'react';
import AppNavbarDropdownLink from './app-navbar-dropdown-link';
import FeatherEditIcon from '@/components/icons/feather-edit.icon';

interface AppNavbarProps extends React.PropsWithChildren {}

const AppNavbar: React.FC<AppNavbarProps> = ({}) => {
  const { user, clearJwtFromStorage } = useAppContext();
  const { current } = useAppPage();

  if (!user) {
    return <></>;
  }

  return (
    <>
      <div className="header-container container-xxl">
        <header className="header navbar navbar-expand-sm expand-header">
          <h4 className="mb-0 fw-semibold">{current?.heading}</h4>
          <ul className="navbar-item flex-row ms-lg-auto ms-0">
            <li className="nav-item dropdown user-profile-dropdown order-lg-0 order-1">
              <a
                href="#"
                role="button"
                className="nav-link dropdown-toggle user"
                id="userProfileDropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div className="avatar-container">
                  <Avatar
                    name={user.name}
                    variant="beam"
                    colors={['#92A1C6', '#146A7C', '#C271B4', '#C20D90']}
                  />
                </div>
              </a>

              <div
                className="dropdown-menu position-absolute"
                aria-labelledby="userProfileDropdown"
              >
                <div className="user-profile-section">
                  <div className="media mx-auto">
                    <div className="emoji me-2">&#x1F44B;</div>
                    <div className="media-body">
                      <h5>{user.name}</h5>
                      <p className="text-lowercase">{user.role}</p>
                    </div>
                  </div>
                </div>
                <div className="dropdown-item">
                  <AppNavbarDropdownLink
                    to="/profile"
                    icon={<FeatherUserIcon />}
                    text="Profile"
                  />
                </div>
                <div className="dropdown-item">
                  <AppNavbarDropdownLink
                    to="/profile/edit"
                    icon={<FeatherEditIcon />}
                    text="Edit Profile"
                  />
                </div>
                <hr className="divider" />
                <div
                  className="dropdown-item"
                  onClick={() => clearJwtFromStorage()}
                >
                  <AppNavbarDropdownLink
                    to="/"
                    icon={<FeatherLogoutIcon />}
                    text="Logout"
                  />
                </div>
              </div>
            </li>
          </ul>
        </header>
      </div>
    </>
  );
};

export default AppNavbar;
