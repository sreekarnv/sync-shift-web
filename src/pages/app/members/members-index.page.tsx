import MembersDataTable from '@/components/tables/members/members-data-table';
import { DataTableItem } from '@/components/tables/data-table-item';
import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';
import useMembersQuery from '@/hooks/api/queries/use-members-query';
import Loader from '@/components/ui/loader';
import { User } from '@/types/User';

interface MembersPageProps extends React.PropsWithChildren {}

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor((row) => row.name, {
    cell: (props) => <DataTableItem.Profile name={props.getValue()} />,
    id: 'name',
    header: () => <span>User</span>,
    enableSorting: true,
  }),

  columnHelper.accessor('email', {
    id: 'email',
    header: () => <span>Email Address</span>,
    cell: (props) => props.getValue(),
    enableSorting: true,
  }),

  columnHelper.accessor('role', {
    id: 'role',
    header: () => <span>Role</span>,
    cell: (props) => (
      <DataTableItem.Badge
        isPrimary={props.getValue().toString() === 'STUDENT'}
      >
        {props.getValue()}
      </DataTableItem.Badge>
    ),
  }),

  columnHelper.display({
    id: 'action',
    header: () => <span>Actions</span>,
    cell: () => <DataTableItem.Action link="/members/2" />,
  }),
];

const MembersPage: React.FC<MembersPageProps> = ({}) => {
  const { isLoading, data } = useMembersQuery();

  if (isLoading) return <Loader />;

  return (
    <>
      <MembersDataTable data={data} columns={columns} />
    </>
  );
};

export default MembersPage;
