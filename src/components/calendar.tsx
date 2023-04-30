import { Calendar as RBCalendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';

import React from 'react';

interface CalendarProps {
  events: any[];
  height?: string | number;
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {
    'en-US': enUS,
  },
});

const Calendar: React.FC<CalendarProps> = ({ events, height }) => {
  const handleSelectSlot = React.useCallback(({}) => {}, []);

  return (
    <RBCalendar
      localizer={localizer}
      events={events}
      style={{ height: height ? height : '80vh' }}
      onSelectSlot={handleSelectSlot}
    />
  );
};

export default Calendar;
