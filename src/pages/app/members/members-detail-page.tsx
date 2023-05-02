import UserProfileCard from '@/components/user-profile-card';
import useMemberDetailQuery from '@/hooks/api/queries/use-member-detail-query';
import useUserFacilitySlotsQuery from '@/hooks/api/queries/use-user-facility-slots-query';
import React from 'react';
import { useParams } from 'react-router-dom';

const MembersDetailPage: React.FC = () => {
  const params = useParams<{ id: string }>();
  const { isLoading: isFLoading, data: fData } = useUserFacilitySlotsQuery(
    params.id!
  );
  const { isLoading, data } = useMemberDetailQuery(params.id!);

  if (isLoading || isFLoading || !data || !fData) return <></>;

  return (
    <>
      <div className="row">
        <div className="col-md-9">
          <pre>{JSON.stringify(fData, null, 2)}</pre>
        </div>
        <div className="col-md-3">{<UserProfileCard user={data} />}</div>
      </div>
    </>
  );
};

export default MembersDetailPage;
