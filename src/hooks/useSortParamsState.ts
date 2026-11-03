import { useSearchParams } from 'react-router';
import { SortOrder } from '../app/api/apiTypes/sharedApiTypes';
import { Column } from '../components/sortTable/SortTable';

type TableProps<T> = {
  columns: Column<T>[];
  initialSortField?: keyof T;
  initialSortOrder?: SortOrder;
};

export const useSortParamsState = <T>({
  columns,
  initialSortField,
  initialSortOrder = 'asc',
}: TableProps<T>) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortField =
    (searchParams.get('sortField') as keyof T) ||
    initialSortField ||
    columns[0]?.key;

  const rawSortOrder = searchParams.get('sortOrder');

  const sortOrder: SortOrder =
    rawSortOrder === 'asc' || rawSortOrder === 'desc'
      ? rawSortOrder
      : initialSortOrder;

  const handleSort = (field: keyof T) => {
    const newOrder: SortOrder =
      sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';

    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      sortField: field as string,
      sortOrder: newOrder,
    });
  };

  return {
    sortOrder,
    onSort: handleSort,
    sortField,
  };
};
