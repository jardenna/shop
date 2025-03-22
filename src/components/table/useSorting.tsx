import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';

type SortDirection = 'ascending' | 'descending';

type SortConfig<T> = {
  key: keyof T;
  direction: SortDirection;
} | null;

function useSorting<T>(items: T[], config: SortConfig<T> = null) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>(config);

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

  const sortFunc = (key: keyof T) => {
    let direction: SortDirection = 'ascending';

    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }

    searchParams.set('sortField', key.toString());
    searchParams.set('sortOrder', direction);
    setSearchParams(searchParams);
    setSortConfig({ key, direction });
  };

  return { sortedItems, sortFunc, sortClassName };
}

export default useSorting;
