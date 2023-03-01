import React from 'react';

interface IndexPageProps extends React.PropsWithChildren {}

const MembersPage: React.FC<IndexPageProps> = ({}) => {
  return (
    <>
      <div className="container">
        <h1>Find Members </h1>
      </div>
    </>
  );
};

export default MembersPage;
