import React from 'react';
import useAppContext from '@/hooks/use-app-context';
import UserProfileCard from '@/components/user-profile-card';
import { createColumnHelper } from '@tanstack/react-table';
import MembersDataTable from '@/components/tables/members/members-data-table';
import { DataTableItem } from '@/components/tables/data-table-item';

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
    cell: (props) => (
      <DataTableItem.Badge
        isPrimary={'STUDENT' === props.getValue()}
        children={props.getValue()}
      />
    ),
  }),

  columnHelper.display({
    id: 'action',
    header: () => <span>Actions</span>,
    cell: () => <DataTableItem.Action link="/members/2" />,
  }),
];

const ProfilePage: React.FC = () => {
  const { user } = useAppContext();

  return (
    <div className="row">
      <div className="col-md-9">
        <MembersDataTable columns={columns} data={defaultData} />
      </div>
      <div className="col-md-3">{user && <UserProfileCard user={user} />}</div>
    </div>
  );
};

export default ProfilePage;
