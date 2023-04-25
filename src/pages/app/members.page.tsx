import DataTable from '@/components/tables/data-table';
import useAppContext from '@/hooks/use-app-context';
import React from 'react';

interface MembersPageProps extends React.PropsWithChildren {}

const MembersPage: React.FC<MembersPageProps> = ({}) => {
  const { user, clearJwtFromStorage } = useAppContext();

  return (
    <>
      <DataTable />
    </>
  );
};

export default MembersPage;
