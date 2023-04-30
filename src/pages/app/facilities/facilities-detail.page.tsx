import React from 'react';
import { useParams } from 'react-router-dom';
import useFacilityQuery from '@/hooks/api/queries/use-facility-query';
import Loader from '@/components/ui/loader';
import FeatherLocationIcon from '@/components/icons/feather-location.icon';
import '@/assets/css/pages/facility-detail.css';
import Calendar from '@/components/calendar';
import useFacilitySlotsQuery from '@/hooks/api/queries/use-facility-slots-query';

const FacilitiesDetailPage: React.FC = () => {
  const params = useParams<{ id: string }>();
  const { data } = useFacilityQuery(params.id as string);
  const { data: slotsData } = useFacilitySlotsQuery(params.id as string);

  const events =
    slotsData?.map((slot) => {
      return {
        title: 'Booked',
        start: new Date(slot.startTimeStamp),
        end: new Date(slot.endTimeStamp),
      };
    }) ?? [];

  console.log(events);

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
                <h6 className="text-success fw-semibold">
                  Available from {data?.availableStartTime} to{' '}
                  {data?.availableEndTime} everyday
                </h6>
              ) : (
                <>
                  <h6 className="text-danger fw-semibold">Not Available</h6>
                </>
              )}
            </div>

            <div className="mt-5">
              <Calendar height="70vh" events={events} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FacilitiesDetailPage;
