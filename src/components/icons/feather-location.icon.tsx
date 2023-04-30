import React from 'react';

const FeatherLocationIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => {
  return (
    <>
      <svg
        viewBox="0 0 24 24"
        width={24}
        height={24}
        stroke="currentColor"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx={12} cy={10} r={3} />
      </svg>
    </>
  );
};

export default FeatherLocationIcon;
