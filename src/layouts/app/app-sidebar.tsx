import FeatherCalendarIcon from '@/components/icons/feather-calendar.icon';
import FeatherLogoutIcon from '@/components/icons/feather-logout-icon';
import FeatherUserIcon from '@/components/icons/feather-user-icon';
import FeatherUsersIcon from '@/components/icons/feather-users-icon';
import useAppContext from '@/hooks/use-app-context';
import Avatar from 'boring-avatars';
import React from 'react';
import AppSidebarMenuHeading from './app-sidebar-menu-heading';
import AppSidebarMenuItem from './app-sidebar-menu-item';

interface AppSidebarProps extends React.PropsWithChildren {}

const AppSidebar: React.FC<AppSidebarProps> = ({}) => {
  const { user, clearJwtFromStorage } = useAppContext();

  if (!user) return <></>;

  return (
    <>
      <div className="sidebar-wrapper sidebar-theme">
        <nav id="sidebar">
          <div className="navbar-nav theme-brand flex-row  text-center">
            <div className="nav-logo">
              <div className="nav-item theme-text">
                <a href="index.html" className="nav-link">
                  {' '}
                  BITS TCS{' '}
                </a>
              </div>
            </div>
          </div>
          <div className="profile-info">
            <div className="user-info">
              <div className="profile-img">
                <Avatar
                  name={user.name}
                  variant="beam"
                  colors={['#92A1C6', '#146A7C', '#C271B4', '#C20D90']}
                />
              </div>
              <div className="profile-content">
                <h6 className="">{user.name}</h6>
                <p className="text-capitalize">{user.role.toLowerCase()}</p>
              </div>
            </div>
          </div>

          <div className="shadow-bottom"></div>
          <ul className="list-unstyled menu-categories" id="accordionExample">
            <AppSidebarMenuHeading>Dashboard</AppSidebarMenuHeading>

            <AppSidebarMenuItem
              to="/"
              icon={<FeatherCalendarIcon />}
              text="Your Schedule"
            />

            <AppSidebarMenuItem
              to="/members"
              icon={<FeatherUsersIcon />}
              text="Find Members"
            />

            <AppSidebarMenuHeading>Settings</AppSidebarMenuHeading>

            <AppSidebarMenuItem
              to="/profile"
              icon={<FeatherUserIcon />}
              text="Profile"
            />

            <AppSidebarMenuItem
              onClick={() => clearJwtFromStorage()}
              to="/"
              icon={<FeatherLogoutIcon />}
              text="Log Out"
            />
          </ul>
        </nav>
      </div>
    </>
  );
};

export default AppSidebar;
