import React from 'react';
import { NavLink } from 'react-router-dom';

interface AppNavbarDropdownLinkProps {
  icon: React.ReactNode;
  text: string;
  to: string;
}

const AppNavbarDropdownLink: React.FC<AppNavbarDropdownLinkProps> = ({
  icon,
  text,
  to,
}) => {
  return (
    <>
      <NavLink to={to}>
        {icon} <span>{text}</span>
      </NavLink>
    </>
  );
};

export default AppNavbarDropdownLink;
