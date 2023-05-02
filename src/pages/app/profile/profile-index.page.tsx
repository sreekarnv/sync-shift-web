import React from 'react';
import useAppContext from '@/hooks/use-app-context';
import UserProfileCard from '@/components/user-profile-card';
import useAuthUserFacilitySlotsQuery from '@/hooks/api/queries/use-auth-user-facility-slots';
import Loader from '@/components/ui/loader';
import Calendar from '@/components/calendar';

const ProfilePage: React.FC = () => {
  const { user } = useAppContext();
  const { isLoading, data } = useAuthUserFacilitySlotsQuery();

  const events =
    data?.map((slot) => {
      return {
        title: 'Booked',
        start: new Date(slot.startTimeStamp),
        end: new Date(slot.endTimeStamp),
      };
    }) ?? [];

  if (isLoading) return <Loader />;

  return (
    <div className="row">
      <div className="col-md-9">
        <Calendar events={events ?? []} />
      </div>
      <div className="col-md-3">{user && <UserProfileCard user={user} />}</div>
    </div>
  );
};

export default ProfilePage;
