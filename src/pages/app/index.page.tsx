import React from 'react';
import Calendar from '@/components/calendar';
import useAuthUserFacilitySlotsQuery from '@/hooks/api/queries/use-auth-user-facility-slots';
import Loader from '@/components/ui/loader';
import useMemberSlotsQuery from '@/hooks/api/queries/use-member-slots-query';
import useAppContext from '@/hooks/use-app-context';

const IndexPage: React.FC = () => {
  const { user } = useAppContext();
  const { data, isLoading } = useAuthUserFacilitySlotsQuery();
  const { data: members, isLoading: isMLoading } = useMemberSlotsQuery(
    user?.id ?? ''
  );

  const eData =
    data?.map((slot) => {
      return {
        title: slot.facility.name + ' - ' + slot.facility.type,
        start: new Date(slot.startTimeStamp),
        end: new Date(slot.endTimeStamp),
      };
    }) ?? [];

  const mData =
    members?.map((slot) => {
      return {
        title:
          'Member Meet With - ' +
          slot.accepted.name +
          ' -' +
          `(${slot.accepted.role})`,
        start: new Date(slot.startTimeStamp),
        end: new Date(slot.endTimeStamp),
      };
    }) ?? [];

  const events = [...eData, ...mData];

  if (isLoading || !user || isMLoading) return <Loader />;

  return <Calendar events={events} />;
};

export default IndexPage;
