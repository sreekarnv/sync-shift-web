import UserProfileCard from '@/components/user-profile-card';
import useMemberDetailQuery from '@/hooks/api/queries/use-member-detail-query';
import useUserFacilitySlotsQuery from '@/hooks/api/queries/use-user-facility-slots-query';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useForm } from 'react-hook-form';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import FormInput from '@/components/forms/form-input';
import Button from '@/components/ui/button';
import FormError from '@/components/forms/form-error';
import Calendar from '@/components/calendar';
import useBookMemberMutation from '@/hooks/api/mutations/use-book-member-mutation';
import useMemberSlotsQuery from '@/hooks/api/queries/use-member-slots-query';

export const constructDateObject = (dateStr: string, timeStr: string) => {
  const [monthStr, dayStr, yearStr] = dateStr.split('/');
  const [hoursStr, minutesStr] = timeStr.split(':');

  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10) - 1;
  const day = parseInt(dayStr, 10);
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  const dateObj = new Date(year, month, day, hours, minutes);
  return dateObj;
};

const MembersDetailPage: React.FC = () => {
  const params = useParams<{ id: string }>();
  const [hasConflict, setHasConflict] = React.useState<string | null>(null);
  const { isLoading: isFLoading, data: fData } = useUserFacilitySlotsQuery(
    params.id!
  );
  const { isLoading, data } = useMemberDetailQuery(params.id!);
  const { isLoading: isMLoading, data: mData } = useMemberSlotsQuery(
    params.id!
  );
  const { register, handleSubmit, setValue } = useForm();

  const { mutate: bookSlot, isLoading: isBookSlotLoading } =
    useBookMemberMutation(params.id!, () => {
      setShowFormOrCal(false);
    });

  const [selected, setSelected] = React.useState<Date>(new Date());
  const [showDateCalendar, setShowDateCalendar] = React.useState(false);
  const [showFormOrCal, setShowFormOrCal] = React.useState(false);

  const onSubmit = (data: any) => {
    setHasConflict(null);

    // Create new date object from date and time
    const newStartDate = constructDateObject(data.date, data.startTime);
    const newEndDate = constructDateObject(data.date, data.endTime);

    // ccheck if date conflicts with existing slots
    const conflicts = fData?.filter((slot) => {
      const slotStartDate = new Date(slot.startTimeStamp);
      const slotEndDate = new Date(slot.endTimeStamp);

      return (
        (newStartDate >= slotStartDate && newStartDate <= slotEndDate) ||
        (newEndDate >= slotStartDate && newEndDate <= slotEndDate)
      );
    });

    if (conflicts?.length) {
      setHasConflict('This Slot is already been booked or is unavailable');
      return;
    }
    // Mutate
    bookSlot({
      startTimeStamp: newStartDate
        .toISOString()
        .replace('T', ' ')
        .replace('Z', ''),
      endTimeStamp: newEndDate.toISOString().replace('T', ' ').replace('Z', ''),
    });
  };

  const eventsf =
    fData?.map((slot) => {
      return {
        title: 'Facility Booked - ' + slot.facility.name,
        start: new Date(slot.startTimeStamp),
        end: new Date(slot.endTimeStamp),
      };
    }) ?? [];

  const eventsM =
    mData?.map((slot) => {
      return {
        title: 'Member Meet',
        start: new Date(slot.startTimeStamp),
        end: new Date(slot.endTimeStamp),
      };
    }) ?? [];

  const events = [...eventsf, ...eventsM];

  if (isLoading || isFLoading || !data || !fData || isMLoading || !mData)
    return <></>;

  if (data?.isWithdrawn) {
    return (
      <div className="row">
        <div className="col-md-12 text-center">
          <h2 className="mt-3 mb-4">Member has withdrawn</h2>
          <Link to="/members">
            <Button>Go Back to Members</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="row">
        <div className="col-md-9">
          <div className="d-flex justify-content-between">
            <div>
              <h2>Member Schedule</h2>
              <p className="mb-5">
                This member is available from {data.defaultStartAvailableTime}{' '}
                to {data.defaultEndAvailableTime}{' '}
              </p>
            </div>
            <div>
              <Button
                onClick={() => setShowFormOrCal(false)}
                variant="outline"
                className="mx-2"
              >
                Show Calendar
              </Button>
              <Button onClick={() => setShowFormOrCal(true)} color="dark">
                Book Slot
              </Button>
            </div>
          </div>

          <div>
            {!showFormOrCal && <Calendar events={events} />}

            {showFormOrCal && (
              <>
                {hasConflict && (
                  <FormError
                    error={
                      {
                        response: {
                          data: {
                            errors: [hasConflict],
                          },
                        },
                      } as any
                    }
                  />
                )}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <label
                      htmlFor="date"
                      className="d-flex items-center gap-5 align-items-center"
                    >
                      Select Date
                      <Button
                        color="info"
                        onClick={() => setShowDateCalendar(!showDateCalendar)}
                        type="button"
                      >
                        {showDateCalendar ? 'Hide' : 'Show'}
                      </Button>
                    </label>

                    <DayPicker
                      mode="single"
                      selected={selected}
                      // @ts-ignore
                      onSelect={setSelected}
                      onDayClick={(p) => {
                        setValue('date', p.toLocaleDateString());
                      }}
                      fromYear={new Date().getFullYear()}
                      className={showDateCalendar ? '' : 'd-none'}
                    />
                  </div>

                  <FormInput
                    label="Select Start Time"
                    id="startTime"
                    type="time"
                    {...register('startTime', { required: true })}
                  />

                  <FormInput
                    label="Select End Time"
                    id="endTime"
                    type="time"
                    {...register('endTime', { required: true })}
                  />

                  <Button isLoading={isBookSlotLoading} type="submit">
                    Book Slot
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>

        <div className="col-md-3">
          {<UserProfileCard showEdit={false} user={data} />}
        </div>
      </div>
    </>
  );
};

export default MembersDetailPage;
