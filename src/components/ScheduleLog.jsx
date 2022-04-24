import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { ArrowDown } from '../assets/icons/ArrowDown';
import { ArrowUp } from '../assets/icons/ArrowUp';
import { axiosRequest } from '../helpers/axiosRequest';
import formatDate from '../helpers/formatDate';
import useReactTable from '../hooks/useReactTable';

import { AppContext } from '../store/AppContext';

const ScheduleLog = () => {
  // Context
  const { selected } = useContext(AppContext);

  // React Query
  const { isLoading, data } = useQuery(
    [
      'scheduleLogs',
      {
        method: 'GET',
        endpoint: `scheduleLogs`,
        params: {
          scheduleId: selected?.id
        }
      }
    ],
    axiosRequest,
    { enabled: Boolean(selected) }
  );
  // Custom hook that create the React Table data
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useReactTable(data);

  if (isLoading) return <p>Loading...</p>;
  if (!selected) return <p>Please select a card to see logs</p>;

  return (
    <div className="w-full overflow-auto">
      <div className="pb-4 ">
        <h2 className="text-lg font-bold ">{selected.name}</h2>
      </div>
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
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className={`table-cell bg-teal-300 ${
                        column.grow ? 'w-[1%]' : 'w-[0.00001%]'
                      }`}
                    >
                      {
                        // Render the header
                        column.render('Header')
                      }
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <ArrowDown />
                          ) : (
                            <ArrowUp />
                          )
                        ) : (
                          ''
                        )}
                      </span>
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
                          className={`table-cell border-gray-500 ${
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
