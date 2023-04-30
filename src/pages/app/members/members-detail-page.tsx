import Calendar from '@/components/calendar';
import UserProfileCard from '@/components/user-profile-card';
import React from 'react';
import { events } from '../index.page';

const MembersDetailPage: React.FC = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-9">
          <Calendar events={events} />
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
