import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';

export type SortDirection = 'ascending' | 'descending';

type SortConfig<T> = {
  key: keyof T;
  direction: SortDirection;
} | null;

function useSorting<T>(items: T[]) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [initialSortState, setSortConfig] = useState<SortConfig<T>>(null);

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

  const sortDirection = (name: string) => {
    if (!initialSortState) {
      return '';
    }
    return initialSortState.key === name ? initialSortState.direction : '';
  };

  const sortedItems = useMemo(() => {
    const sortableItems = [...items];
    if (initialSortState !== null) {
      sortableItems.sort((a, b) => {
        if (a[initialSortState.key] < b[initialSortState.key]) {
          return initialSortState.direction === 'ascending' ? -1 : 1;
        }
        if (a[initialSortState.key] > b[initialSortState.key]) {
          return initialSortState.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, initialSortState]);

  const sortFunction = (key: keyof T) => {
    let direction: SortDirection = 'ascending';

    if (
      initialSortState &&
      initialSortState.key === key &&
      initialSortState.direction === 'ascending'
    ) {
      direction = 'descending';
    }

    searchParams.set('sortKey', key.toString());
    searchParams.set('sortOrder', direction);
    setSearchParams(searchParams);
    setSortConfig({ key, direction });

    return direction;
  };

  return {
    sortedItems,
    sortFunction,
    sortDirection,
    onClearAllParams: handleClearAllParams,
  };
}

export default useSorting;
