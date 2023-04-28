import { DataTableItem } from '@/components/tables/data-table-item';
import FacilitiesDataTable from '@/components/tables/facilities/facilites-data-table';
import Loader from '@/components/ui/loader';
import useFacilitiesQuery from '@/hooks/api/queries/use-facilities-query';
import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';

type Facility = {
  id: number;
  name: string;
  type: string;
  location: string;
};

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
    cell: () => <DataTableItem.Action link="/facilities/2" />,
  }),
];

const FacilitiesPage: React.FC = () => {
  const { data, isLoading } = useFacilitiesQuery();

  if (isLoading) return <Loader />;

  return (
    <>
      <FacilitiesDataTable data={data} columns={columns} />
    </>
  );
};

export default FacilitiesPage;
