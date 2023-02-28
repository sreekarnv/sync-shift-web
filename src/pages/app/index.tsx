import useAppContext from '@/hooks/use-app-context';
import React from 'react';
import { Link } from 'react-router-dom';

interface IndexPageProps extends React.PropsWithChildren {}

const IndexPage: React.FC<IndexPageProps> = ({}) => {
  const { user, clearJwtFromStorage } = useAppContext();

  return (
    <>
      <div className="container">
        <h1 className="mb-4">Data</h1>
        <pre>{JSON.stringify(user, null, 2)}</pre>

        <Link to="/auth/signin">Sign In</Link>
        <Link to="/auth/signup">Sign Up</Link>
        <button
          onClick={() => {
            clearJwtFromStorage();
          }}
          className="btn btn-danger"
        >
          Sign Out
        </button>
      </div>
    </>
  );
};

export default IndexPage;
