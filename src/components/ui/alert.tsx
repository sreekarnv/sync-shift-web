import clsx from 'clsx';
import React from 'react';

import '@/assets/css/components/alert.css';

interface AlertProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

const Alert: React.FC<AlertProps> = ({ children, className, ...props }) => {
  return (
    <>
      <div
        className={clsx(['alert alert-light-danger border-0', className])}
        {...props}
      >
        {children}
      </div>
    </>
  );
};

export default Alert;
