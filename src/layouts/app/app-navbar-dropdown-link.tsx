import React from 'react';
import { Link } from 'react-router-dom';

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
      <Link to={to}>
        {icon} <span>{text}</span>
      </Link>
    </>
  );
};

export default AppNavbarDropdownLink;
