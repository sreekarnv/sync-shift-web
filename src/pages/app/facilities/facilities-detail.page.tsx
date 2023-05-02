import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useFacilityQuery from '@/hooks/api/queries/use-facility-query';
import Loader from '@/components/ui/loader';
import FeatherLocationIcon from '@/components/icons/feather-location.icon';
import '@/assets/css/pages/facility-detail.css';
import Calendar from '@/components/calendar';
import useFacilitySlotsQuery from '@/hooks/api/queries/use-facility-slots-query';
import Button from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { DayPicker } from 'react-day-picker';
import FormInput from '@/components/forms/form-input';
import { constructDateObject } from '../members/members-detail-page';
import FormError from '@/components/forms/form-error';
import useBookFacilityMutation from '@/hooks/api/mutations/use-book-facility-mutation';

const FacilitiesDetailPage: React.FC = () => {
  const params = useParams<{ id: string }>();
  const { data } = useFacilityQuery(params.id as string);
  const { data: slotsData } = useFacilitySlotsQuery(params.id as string);
  const [showForm, setShowForm] = React.useState(false);
  const { isLoading, mutate: createBookFacility } = useBookFacilityMutation(
    params.id as string,
    () => {
      setShowForm(false);
    }
  );

  const { register, handleSubmit, setValue } = useForm();

  const [selected, setSelected] = React.useState<Date>(new Date());
  const [showDateCalendar, setShowDateCalendar] = React.useState(false);
  const [hasConflict, setHasConflict] = React.useState<string | null>(null);

  const onSubmit = (body: any) => {
    setHasConflict(null);
    const newStartDate = constructDateObject(body.date, body.startTime);
    const newEndDate = constructDateObject(body.date, body.endTime);

    if (newStartDate > newEndDate) {
      setHasConflict('Start time cannot be greater than end time');
      return;
    }

    if (
      `${body.startTime}:00` < data?.availableStartTime! ||
      `${body.endTime}:00` > data?.availableEndTime!
    ) {
      setHasConflict(
        `Slots are only available from ${data?.availableStartTime} to ${data?.availableEndTime}`
      );
      return;
    }

    const conflicts = slotsData?.filter((slot) => {
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
    createBookFacility({
      startTimeStamp: newStartDate
        .toISOString()
        .replace('T', ' ')
        .replace('Z', ''),
      endTimeStamp: newEndDate.toISOString().replace('T', ' ').replace('Z', ''),
    });
  };

  const events =
    slotsData?.map((slot) => {
      return {
        title: 'Booked',
        start: new Date(slot.startTimeStamp),
        end: new Date(slot.endTimeStamp),
      };
    }) ?? [];

  if (!data || !slotsData) return <Loader />;

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="row align-items-end mb-4">
            <div className="col-md-4">
              <h1>{data?.name}</h1>
              <p className="facility-location text-primary">
                <FeatherLocationIcon className="facility-location-icon" />
                {data.location}
              </p>
            </div>
            <div className="col-md-8 d-flex align-items-end flex-column justify-content-center">
              {data.isAvailable ? (
                <>
                  <h6 className="text-success fw-semibold">
                    Available from {data?.availableStartTime} to{' '}
                    {data?.availableEndTime} everyday
                  </h6>
                  <Button onClick={() => setShowForm(!showForm)} color="info">
                    Book Slot
                  </Button>
                </>
              ) : (
                <>
                  <h6 className="text-danger fw-semibold">Not Available</h6>
                </>
              )}
            </div>

            {data.isAvailable && (
              <div className="mt-5">
                <div className="row">
                  <div className={showForm ? 'col-md-8' : 'col-md-12'}>
                    <Calendar height="70vh" events={events} />
                  </div>
                  {showForm && (
                    <div className="col-md-4">
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
                              onClick={() =>
                                setShowDateCalendar(!showDateCalendar)
                              }
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

                        <div className="mb-3">
                          <FormInput
                            label="Select Start Time"
                            id="startTime"
                            type="time"
                            {...register('startTime', { required: true })}
                          />
                          <small>
                            <strong>Note:</strong> Allowed time is between{' '}
                            {data?.availableStartTime} to{' '}
                            {data?.availableEndTime}
                          </small>
                        </div>

                        <div className="mb-3">
                          <FormInput
                            label="Select End Time"
                            id="endTime"
                            type="time"
                            {...register('endTime', { required: true })}
                          />
                          <small>
                            <strong>Note:</strong> Allowed time is between{' '}
                            {data?.availableStartTime} to{' '}
                            {data?.availableEndTime}
                          </small>
                        </div>

                        <Button isLoading={isLoading} type="submit">
                          Book Slot
                        </Button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!data.isAvailable && (
              <div className="mt-5 text-center">
                <h3 className="mb-4">This facility is Currently Unavailable</h3>
                <Link to="/facilities">
                  <Button color="dark">Back to Facilities</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FacilitiesDetailPage;
