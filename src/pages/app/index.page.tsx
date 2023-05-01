import React from 'react';
import Calendar from '@/components/calendar';
import useUserFacilitySlotsQuery from '@/hooks/api/queries/use-user-facility-slots';
import Loader from '@/components/ui/loader';

const IndexPage: React.FC = () => {
  const { data, isLoading } = useUserFacilitySlotsQuery();

  const eData =
    data?.map((slot) => {
      return {
        title: slot.facility.name + ' - ' + slot.facility.type,
        start: new Date(slot.startTimeStamp),
        end: new Date(slot.endTimeStamp),
      };
    }) ?? [];

  if (isLoading) return <Loader />;

  return <Calendar events={eData} />;
};

export default IndexPage;
