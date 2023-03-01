import clsx from 'clsx';
import React from 'react';

interface FeatherUserIconProps extends React.SVGProps<SVGSVGElement> {}

const FeatherUserIcon: React.FC<FeatherUserIconProps> = ({
  className,
  ...props
}) => {
  return (
    <>
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
        className={clsx(['feather feather-user', className])}
        {...props}
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    </>
  );
};

export default FeatherUserIcon;
