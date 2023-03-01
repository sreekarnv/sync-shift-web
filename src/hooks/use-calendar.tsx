import { Calendar, ToolbarInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import React from 'react';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

const calendarHeaderToolbar: ToolbarInput = {
  left: 'prev next addEventButton',
  center: 'title',
  right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
};

var newDate = new Date();

function getDynamicMonth() {
  const getMonthValue = newDate.getMonth();
  const _getUpdatedMonthValue = getMonthValue + 1;
  if (_getUpdatedMonthValue < 10) {
    return `0${_getUpdatedMonthValue}`;
  } else {
    return `${_getUpdatedMonthValue}`;
  }
}

var calendarEventsList = [
  {
    id: 1,
    title: 'All Day Event',
    start: `${newDate.getFullYear()}-${getDynamicMonth()}-01`,
    extendedProps: { calendar: 'Work' },
  },
  {
    id: 2,
    title: 'Long Event',
    start: `${newDate.getFullYear()}-${getDynamicMonth()}-07`,
    end: `${newDate.getFullYear()}-${getDynamicMonth()}-10`,
    extendedProps: { calendar: 'Personal' },
  },
  {
    groupId: '999',
    id: 3,
    title: 'Repeating Event',
    start: `${newDate.getFullYear()}-${getDynamicMonth()}-09T16:00:00`,
    extendedProps: { calendar: 'Important' },
  },
  {
    groupId: '999',
    id: 4,
    title: 'Repeating Event',
    start: `${newDate.getFullYear()}-${getDynamicMonth()}-16T16:00:00`,
    extendedProps: { calendar: 'Travel' },
  },
  {
    id: 5,
    title: 'Conference',
    start: `${newDate.getFullYear()}-${getDynamicMonth()}-11`,
    end: `${newDate.getFullYear()}-${getDynamicMonth()}-13`,
    extendedProps: { calendar: 'Work' },
  },
  {
    id: 6,
    title: 'Meeting',
    start: `${newDate.getFullYear()}-${getDynamicMonth()}-12T10:30:00`,
    end: `${newDate.getFullYear()}-${getDynamicMonth()}-12T12:30:00`,
    extendedProps: { calendar: 'Personal' },
  },
  {
    id: 7,
    title: 'Lunch',
    start: `${newDate.getFullYear()}-${getDynamicMonth()}-12T12:00:00`,
    extendedProps: { calendar: 'Important' },
  },
  {
    id: 8,
    title: 'Meeting',
    start: `${newDate.getFullYear()}-${getDynamicMonth()}-12T14:30:00`,
    extendedProps: { calendar: 'Travel' },
  },
  {
    id: 9,
    title: 'Birthday Party',
    start: `${newDate.getFullYear()}-${getDynamicMonth()}-13T07:00:00`,
    extendedProps: { calendar: 'Personal' },
  },
  {
    id: 10,
    title: 'Click for Google',
    url: 'http://google.com/',
    start: `${newDate.getFullYear()}-${getDynamicMonth()}-28`,
    extendedProps: { calendar: 'Important' },
  },
];

const useCalendar = () => {
  const calendarDivRef = React.useRef<HTMLDivElement | null>(null);
  const calendarRef = React.useRef<Calendar | null>(null);

  const checkWidowWidth = () => {
    return window.innerWidth <= 1199;
  };

  React.useEffect(() => {
    if (calendarDivRef.current) {
      calendarRef.current = new Calendar(calendarDivRef.current, {
        plugins: [dayGridPlugin, bootstrap5Plugin],
        themeSystem: 'bootstrap5',
        headerToolbar: calendarHeaderToolbar,
        selectable: true,
        customButtons: {
          addEventButton: {
            text: 'Add Event',
          },
        },
        windowResize: function () {
          if (calendarRef.current) {
            if (checkWidowWidth()) {
              calendarRef.current.changeView('listWeek');
              calendarRef.current.setOption('height', 900);
            } else {
              calendarRef.current.changeView('dayGridMonth');
              calendarRef.current.setOption('height', 1052);
            }
          }
        },
      });

      calendarRef.current.render();
    }
  }, []);

  return { calendarDivRef, calendarRef };
};

export default useCalendar;
