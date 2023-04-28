import UserProfileCard from '@/components/user-profile-card';
import React from 'react';
import { MyCalendar } from '../index.page';

const MembersDetailPage: React.FC = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-9">
          <MyCalendar />
        </div>
        <div className="col-md-3">
          {
            <UserProfileCard
              user={{
                id: 12,
                name: 'John Doe',
                email: 'john@email.com',
                role: 'STAFF',
              }}
            />
          }
        </div>
      </div>
    </>
  );
};

export default MembersDetailPage;
