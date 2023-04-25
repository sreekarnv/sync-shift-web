import Button from '@/components/ui/button';
import React from 'react';
import { Link } from 'react-router-dom';

const ProfileEditPage: React.FC = () => {
  return (
    <>
      <div>
        <Link to="/profile">
          <Button variant="outline" color="dark" className="mb-4">
            &larr; &nbsp;Back to Profile
          </Button>
        </Link>
        <h1>Profile Edit Page</h1>
      </div>
    </>
  );
};

export default ProfileEditPage;
