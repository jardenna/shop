import { useSearchParams } from 'react-router';
import { SortOrder } from '../app/api/apiTypes/sharedApiTypes';
import { Column } from '../components/sortTable/Table';

type TableProps<T> = {
  columns: Column<T>[];
};

export const useSortParamsState = <T>({ columns }: TableProps<T>) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortField =
    (searchParams.get('sortField') as keyof T) || columns[0]?.key;

  const sortOrder = searchParams.get('sortOrder') || 'asc';

  const handleSort = (field: keyof T) => {
    const newOrder: SortOrder =
      sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      sortField: field as string,
      sortOrder: newOrder,
    });
  };

  const handleClearAllParams = () => {
    setSearchParams('');
  };

  return {
    sortOrder,
    onSort: handleSort,
    onClearAllParams: handleClearAllParams,
  };
};
