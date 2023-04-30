import React from 'react';
import { Event } from 'react-big-calendar';
import Calendar from '@/components/calendar';

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

const IndexPage: React.FC = () => {
  return <Calendar events={events} />;
};

export default IndexPage;
