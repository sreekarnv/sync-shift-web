import React from 'react';

import '@/assets/css/components/loader.css';

interface LoaderProps extends React.PropsWithChildren {}

const Loader: React.FC<LoaderProps> = ({}) => {
  return (
    <>
      <div className="loader-root">
        <div className="loader">
          <div className="loader-content">
            <div className="spinner-grow align-self-center"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loader;
