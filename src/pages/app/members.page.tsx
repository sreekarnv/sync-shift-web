import { FormSelect } from '@/components/forms/form-select';
import DataTable from '@/components/tables/data-table';
import { DataTableItem } from '@/components/tables/data-table-item';
import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';

interface MembersPageProps extends React.PropsWithChildren {}

type User = {
  id: number;
  image: string;
  name: string;
  email: string;
  role: string;
};

const defaultData: User[] = [
  {
    name: 'tanner',
    id: 24,
    role: 'STUDENT',
    email: 'tanner@email.com',
    image: '/images/profile.jpeg',
  },
  {
    name: 'tandy',
    id: 40,
    role: 'STAFF',
    email: 'tandy@email.com',
    image: '/images/profile.jpeg',
  },
  {
    name: 'joe',
    id: 45,
    role: 'STUDENT',
    email: 'joe@email.com',
    image: '/images/profile.jpeg',
  },
];

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor(
    (row) => {
      return {
        name: row.name,
        image: row.image,
      };
    },
    {
      cell: (props) => (
        <DataTableItem.Profile
          name={props.getValue().name}
          image={props.getValue().image}
        />
      ),
      id: 'name',
      header: () => <span>User</span>,
      enableSorting: true,
    }
  ),

  columnHelper.accessor('email', {
    id: 'email',
    header: () => <span>Email Address</span>,
    cell: (props) => props.getValue(),
    enableSorting: true,
  }),

  columnHelper.accessor('role', {
    id: 'role',
    header: () => <span>Role</span>,
    cell: (props) => <DataTableItem.RoleBadge role={props.getValue()} />,
  }),

  columnHelper.display({
    id: 'action',
    header: () => <span>Actions</span>,
    cell: () => <DataTableItem.Action userId="userId" />,
  }),
];

const MembersPage: React.FC<MembersPageProps> = ({}) => {
  return (
    <>
      <DataTable data={defaultData} columns={columns} />
    </>
  );
};

export default MembersPage;
