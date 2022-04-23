import axios from 'axios';
import React, { useContext, useMemo } from 'react';
import { useQuery } from 'react-query';
import { useTable } from 'react-table';
import formatDate from '../helpers/formatDate';
import useReactTable from '../hooks/useReactTable';

import { AppContext } from '../store/AppContext';

const ScheduleLog = () => {
  // Context
  const { selected } = useContext(AppContext);

  // React Query
  const { isLoading, data } = useQuery(
    // pass selected to query keys array so to update query when it change
    ['scheduleLogs', selected],
    async () => {
      const { data } = await axios(
        `http://localhost:3000/scheduleLogs?scheduleId=${selected}`
      );
      return data;
    },
    { enabled: Boolean(selected) }
  );
  // Custom hook that create the React Table data
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useReactTable(data);

  if (isLoading) return <p>Loading...</p>;
  if (!selected) return <p>Please select a card to see logs</p>;

  return (
    <div className="w-full overflow-auto">
      {/* apply the table props */}
      <table {...getTableProps()} className="w-full">
        <thead>
          {
            // Loop over the header rows
            headerGroups.map(headerGroup => (
              // Apply the header row props
              <tr
                {...headerGroup.getHeaderGroupProps()}
                // className="border-2 border-black"
              >
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map(column => (
                    // Apply the header cell props
                    <th
                      {...column.getHeaderProps()}
                      className={`px-2 border-2 border-black bg-slate-100 whitespace-nowrap ${
                        column.grow ? 'w-[1%]' : 'w-[0.00001%]'
                      }`}
                    >
                      {
                        // Render the header
                        column.render('Header')
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map(row => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map(cell => {
                      // Apply the cell props
                      return (
                        <td
                          {...cell.getCellProps()}
                          className={`p-2 border-2 border-gray-300 whitespace-nowrap ${
                            cell.column.grow ? 'w-[1%] ' : 'w-[0.00001%]'
                          }`}
                        >
                          {/* // Render the cell contents */}
                          {cell.column.Header === 'startTime' ||
                          cell.column.Header === 'endTime'
                            ? formatDate(cell.value)
                            : cell.value}
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleLog;
