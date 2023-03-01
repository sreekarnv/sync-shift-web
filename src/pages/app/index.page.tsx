import React from 'react';

interface IndexPageProps extends React.PropsWithChildren {}

const IndexPage: React.FC<IndexPageProps> = ({}) => {
  return (
    <>
      <div className="container">
        <h1>Your Schedule</h1>
      </div>
    </>
  );
};

export default IndexPage;
