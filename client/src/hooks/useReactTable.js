import { useMemo } from 'react';
import { useFlexLayout, useTable } from 'react-table';

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

  const tableInstance = useTable({
    columns,
    data
  });
  return tableInstance;
};

export default useReactTable;
