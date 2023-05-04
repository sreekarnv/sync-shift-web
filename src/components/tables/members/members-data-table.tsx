import '@/assets/css/components/data-table.css';
import React from 'react';

import {
  ColumnFiltersState,
  FilterFn,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { rankItem } from '@tanstack/match-sorter-utils';

import FormInput from '@/components/forms/form-input';
import { FormSelect } from '@/components/forms/form-select';
import clsx from 'clsx';

interface MembersDataTableProps {
  data: any[];
  columns: any[];
  header?: React.ReactNode;
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);

  addMeta({
    itemRank,
  });

  return itemRank.passed;
};

const MembersDataTable: React.FC<MembersDataTableProps> = ({
  data: defaultData,
  columns,
}) => {
  const [data, setData] = React.useState<any[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState('');

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  React.useEffect(() => {
    if (defaultData?.length) {
      setData([...defaultData]);
    }
  }, [defaultData]);

  return (
    <div className="row layout-spacing">
      <div className="col-lg-12">
        <div className="statbox widget box box-shadow">
          <div className="dt--top-section">
            <div className="row">
              <div className="col-6 d-flex mt-sm-0 mt-3 align-items-center">
                <FormSelect
                  onChange={(e) => {
                    setColumnFilters([
                      ...columnFilters,
                      { id: 'role', value: e.target.value },
                    ]);
                  }}
                  rootClassName="data-table-role-select-width"
                  id="facilities"
                  label="Filter Role By"
                  options={[
                    {
                      children: '---',
                      value: '',
                    },
                    {
                      children: 'STUDENT',
                      value: 'STUDENT',
                    },
                    {
                      children: 'STAFF',
                      value: 'STAFF',
                    },
                  ]}
                />
              </div>
              <div className="col-6 d-flex justify-content-end mt-sm-0 mt-3">
                <div className="dataTables_filter">
                  <FormInput
                    label=""
                    placeholder="Search.."
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    value={globalFilter}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="widget-content-two widget-content-area rounded">
            <table id="style-2" className="table style-2 dt-table-hover">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <th
                          className={clsx([
                            header.column.getCanSort() &&
                              'sorting cursor-pointer',
                          ])}
                          key={header.id}
                          onClick={() => {
                            if (header.column.getCanSort()) {
                              header.column.toggleSorting();
                            }
                          }}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted() as string] ?? null}
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembersDataTable;
