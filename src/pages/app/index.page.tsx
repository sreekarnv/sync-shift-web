import { Calendar, View,Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { SetStateAction, useCallback, useState } from 'react';

const localizer = momentLocalizer(moment);

// type CourseBookProps = {
// loginStatus?: string;
// };
interface IndexPageProps extends React.PropsWithChildren {}

const IndexPage: React.FC<IndexPageProps> = ({}) => {
  const [date, setDate] = useState(new Date(2015, 3, 1));
  const [view, setView] = useState(Views.WEEK as View);

  const onNavigate = useCallback((newDate: SetStateAction<Date>) => setDate(newDate), [setDate])
  return (
    <>
      <div className="container">
        <h1>Your Schedule</h1>
        <div>
        <div>
    <Calendar
      localizer={localizer}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
        {/* <Calendar
          date={date}
          events={[]}
          localizer={localizer}
          onNavigate={onNavigate}
          onView={setView}
          view={view}
        /> */}
    </div>
      </div>
    </>
  );
};

export default IndexPage;


