import React from 'react';
import clsx from 'clsx';

const variants = {
  solid: {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'btn-success',
    danger: 'btn-danger',
    warning: 'btn-warning',
    info: 'btn-info',
    light: 'btn-light',
    dark: 'btn-dark',
  },
};

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isLoading?: boolean;
  color?: keyof typeof variants.solid;
  variant?: keyof typeof variants;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  isLoading,
  disabled,
  color = 'primary',
  variant = 'solid',
  className,
  icon,
  ...props
}) => {
  return (
    <>
      <button
        className={clsx(['btn', variants[variant][color], className])}
        disabled={disabled || isLoading}
        {...props}
      >
        {!isLoading && icon ? icon : <></>}
        {isLoading && (
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
            className="feather feather-loader spin me-2"
          >
            <line x1="12" y1="2" x2="12" y2="6"></line>
            <line x1="12" y1="18" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="6" y2="12"></line>
            <line x1="18" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
          </svg>
        )}
        <span className="btn-text-inner">{children}</span>
      </button>
    </>
  );
};

export default Button;
