import React from 'react';

const AppSidebarMenuHeading: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <>
      <li className="menu menu-heading">
        <div className="heading">
          <span className="text-uppercase">{children}</span>
        </div>
      </li>
    </>
  );
};

export default AppSidebarMenuHeading;
