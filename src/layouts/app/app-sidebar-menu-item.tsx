import React from 'react';
import { Link } from 'react-router-dom';

interface AppSidebarMenuItemProps
  extends React.DetailedHTMLProps<
    React.LiHTMLAttributes<HTMLLIElement>,
    HTMLLIElement
  > {
  icon: React.ReactNode;
  to: string;
  text: string;
}

const AppSidebarMenuItem: React.FC<AppSidebarMenuItemProps> = ({
  icon,
  to,
  text,
  ...props
}) => {
  return (
    <>
      <li className="menu" {...props}>
        <Link to={to} aria-expanded="false" className="dropdown-toggle">
          <div>
            {icon}
            <span>{text}</span>
          </div>
        </Link>
      </li>
    </>
  );
};

export default AppSidebarMenuItem;
