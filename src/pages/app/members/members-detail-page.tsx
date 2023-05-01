import Calendar from '@/components/calendar';
import UserProfileCard from '@/components/user-profile-card';
import React from 'react';
import { Event } from 'react-big-calendar';
// import { events } from '../index.page';

export const events: Event[] = [
  {
    title: 'All Day Event very long title',
    start: new Date('2023-04-26T10:00'),
    end: new Date('2023-04-26T10:40'),
    resource: 'test',
  },
  {
    title: 'Long Event',
    start: new Date('2023-04-29T23:00'),
    end: new Date('2023-04-29T23:39'),
  },
];

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
