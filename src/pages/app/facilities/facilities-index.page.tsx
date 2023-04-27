import { DataTableItem } from '@/components/tables/data-table-item';
import FacilitiesDataTable from '@/components/tables/facilities/facilites-data-table';
import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';

type Facility = {
  id: number;
  name: string;
  type: string;
  location: string;
};

const defaultData: Facility[] = [
  {
    id: 21,
    name: 'Music Room',
    type: 'INDOOR',
    location: 'SAC',
  },
  {
    id: 24,
    name: 'Chess Room',
    type: 'INDOOR',
    location: 'SAC',
  },
  {
    id: 25,
    name: 'Football Field',
    type: 'OUTDOOR',
    location: 'Mess 1',
  },
];

const columnHelper = createColumnHelper<Facility>();

const columns = [
  columnHelper.accessor('name', {
    id: 'email',
    header: () => <span>Name</span>,
    cell: (props) => props.getValue(),
    enableSorting: true,
  }),

  columnHelper.accessor('type', {
    id: 'type',
    header: () => <span>Type</span>,
    cell: (props) => (
      <DataTableItem.Badge
        isPrimary={props.getValue() === 'INDOOR'}
        children={props.getValue()}
      />
    ),
  }),

  columnHelper.accessor('location', {
    id: 'location',
    header: () => <span>Location</span>,
    cell: (props) => <span>{props.getValue()}</span>,
  }),

  columnHelper.display({
    id: 'action',
    header: () => <span>Actions</span>,
    cell: () => <DataTableItem.Action userId="userId" />,
  }),
];

const FacilitiesPage: React.FC = () => {
  return (
    <>
      <FacilitiesDataTable data={defaultData} columns={columns} />
    </>
  );
};

export default FacilitiesPage;
