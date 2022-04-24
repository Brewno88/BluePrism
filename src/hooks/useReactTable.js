import { useMemo } from 'react';
import { useSortBy, useTable } from 'react-table';

const useReactTable = data => {
  const columns = useMemo(() => {
    if (data) {
      return Object.keys(data[0]).map(key => {
        return {
          Header: key,
          accessor: key,
          grow: ['serverName'].includes(key)
        };
      });
    }
    return [];
  }, [data]);

  const tableInstance = useTable(
    {
      columns,
      data
    },
    useSortBy
  );
  return tableInstance;
};

export default useReactTable;
