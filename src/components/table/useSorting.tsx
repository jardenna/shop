import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';

type SortDirection = 'ascending' | 'descending';

type SortConfig<T> = {
  key: keyof T;
  direction: SortDirection;
} | null;

function useSorting<T>(items: T[]) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>(null);

  function handleClearAllParams() {
    setSearchParams();
  }

  useEffect(() => {
    const getSortParams = Object.fromEntries(searchParams);

    setSortConfig({
      key: getSortParams.sortKey as keyof T,
      direction:
        getSortParams.sortOrder === 'ascending' ? 'ascending' : 'descending',
    });
  }, [searchParams]);

  const sortClassName = (name: keyof T) => {
    if (!sortConfig) {
      return '';
    }
    return sortConfig.key === name ? sortConfig.direction : '';
  };

  const sortedItems = useMemo(() => {
    const sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const sortFunction = (key: keyof T) => {
    let direction: SortDirection = 'ascending';

    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }

    searchParams.set('sortKey', key.toString());
    searchParams.set('sortOrder', direction);
    setSearchParams(searchParams);
    setSortConfig({ key, direction });
  };

  return {
    sortedItems,
    sortFunction,
    sortClassName,
    onClearAllParams: handleClearAllParams,
  };
}

export default useSorting;
