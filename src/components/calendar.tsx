import {
  Event,
  EventPropGetter,
  Calendar as RBCalendar,
  Views,
  dateFnsLocalizer,
} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';

import React from 'react';

interface CalendarProps {
  events: any[];
  height?: string | number;
  eventPropGetter?: EventPropGetter<Event>;
  elementProps?: React.HTMLAttributes<HTMLElement>;
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

const Calendar: React.FC<CalendarProps> = ({
  events,
  height,
  elementProps,
  eventPropGetter,
}) => {
  const handleSelectSlot = React.useCallback(({}) => {}, []);

  return (
    <RBCalendar
      localizer={localizer}
      defaultView={Views.WEEK}
      events={events}
      style={{ height: height ? height : '80vh' }}
      onSelectSlot={handleSelectSlot}
      eventPropGetter={eventPropGetter}
      elementProps={elementProps}
    />
  );
};

export default Calendar;
