import React from 'react';
import '@/assets/css/components/data-table.css';

interface DataTableProps {
  data: any[];
  columns: any[];
}

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

const DataTable: React.FC<DataTableProps> = ({
  data: defaultData,
  columns,
}) => {
  const [data] = React.useState(() => [...defaultData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="row layout-spacing">
      <div className="col-lg-12">
        <div className="statbox widget box box-shadow">
          <div className="widget-content-two widget-content-area rounded">
            <table id="style-2" className="table style-2 dt-table-hover">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
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

export default DataTable;
