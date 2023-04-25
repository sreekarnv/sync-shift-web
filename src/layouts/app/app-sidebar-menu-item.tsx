import clsx from 'clsx';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface AppSidebarMenuItemProps
  extends React.DetailedHTMLProps<
    React.LiHTMLAttributes<HTMLLIElement>,
    HTMLLIElement
  > {
  icon: React.ReactNode;
  to: string;
  text: string;
  exact?: boolean;
}

const AppSidebarMenuItem: React.FC<AppSidebarMenuItemProps> = ({
  icon,
  to,
  text,
  className,
  exact = true,
  ...props
}) => {
  const location = useLocation();

  return (
    <>
      <li
        className={clsx([
          'menu',
          exact
            ? location.pathname === to && 'active'
            : location.pathname.startsWith(to) && 'active',
          className,
        ])}
        {...props}
      >
        <Link
          to={to}
          aria-expanded="false"
          className="dropdown-toggle text-inherit"
        >
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
