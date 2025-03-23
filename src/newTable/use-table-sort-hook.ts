import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

export type SortDirection = 'asc' | 'desc' | null;

interface SortingState<K> {
  direction: SortDirection;
  key: K | null;
}

function useTableSort<T, K extends keyof T>(initialConfig?: {
  key?: K | null;
  direction?: SortDirection;
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultConfig: SortingState<K> = {
    key: null,
    direction: null,
  };

  const config = initialConfig
    ? { ...defaultConfig, ...initialConfig }
    : defaultConfig;

  // Initialize from URL params or defaults
  const [tableSort, setTableSort] = useState<SortingState<K>>({
    key: (searchParams.get('sortKey') as K) || config.key,
    direction:
      (searchParams.get('sortDir') as SortDirection) || config.direction,
  });

  // Update URL when sort changes
  useEffect(() => {
    const currentParams = Object.fromEntries(searchParams.entries());
    const newParams = { ...currentParams };

    if (tableSort.key) {
      newParams.sortKey = String(tableSort.key);
      if (tableSort.direction) {
        newParams.sortDir = tableSort.direction;
      } else {
        delete newParams.sortDir;
      }
    } else {
      delete newParams.sortKey;
      delete newParams.sortDir;
    }

    setSearchParams(newParams);
  }, [tableSort, searchParams, setSearchParams]);

  // Handle sorting logic
  const handleSort = (key: K) => {
    let direction: SortDirection = 'asc';

    if (tableSort.key === key) {
      if (tableSort.direction === 'asc') {
        direction = 'desc';
      } else if (tableSort.direction === 'desc') {
        direction = null;
      }
    }

    setTableSort({ key, direction });
  };

  // Function to sort data
  const sortData = (data: T[]): T[] => {
    if (!tableSort.key || !tableSort.direction) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = a[tableSort.key as keyof T];
      const bValue = b[tableSort.key as keyof T];

      // Basic comparison for strings and numbers
      if (aValue < bValue) {
        return tableSort.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return tableSort.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  // Reset sort function
  const resetSort = () => {
    setTableSort({ key: null, direction: null });
  };

  // Get sort indicator icon
  const getSortIcon = (key: K) => {
    if (tableSort.key !== key) {
      return '⇅';
    }
    if (tableSort.direction === 'asc') {
      return '↑';
    }
    if (tableSort.direction === 'desc') {
      return '↓';
    }
    return '⇅';
  };

  return {
    sortState: tableSort,
    handleSort,
    sortData,
    resetSort,
    getSortIcon,
  };
}

export default useTableSort;
