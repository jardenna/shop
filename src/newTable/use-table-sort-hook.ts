import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

export type SortDirection = 'asc' | 'desc' | null;

interface SortingState<K> {
  direction: SortDirection;
  sortKey: K | null;
}

// Parameters:
// Takes an optional sort object with these properties:
// - sortKey: Which column to initially sort by (e.g., 'name', 'email')
// - direction: Initial sort direction ('asc', 'desc')

function useTableSort<T, K extends keyof T>(initialConfig?: {
  sortKey?: K;
  direction?: SortDirection;
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultConfig: SortingState<K> = {
    sortKey: null,
    direction: null,
  };

  const config = initialConfig
    ? { ...defaultConfig, ...initialConfig }
    : defaultConfig;

  // Initialize from URL params or defaults
  const [tableSort, setTableSort] = useState<SortingState<K>>({
    sortKey: (searchParams.get('sortKey') as K) || config.sortKey,
    direction:
      (searchParams.get('sortDir') as SortDirection) || config.direction,
  });

  // Update URL when sort changes
  useEffect(() => {
    const currentParams = Object.fromEntries(searchParams.entries());
    const newParams = { ...currentParams };

    if (tableSort.sortKey) {
      newParams.sortKey = String(tableSort.sortKey);
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
  const handleSort = (sortKey: K) => {
    let direction: SortDirection = 'asc';

    if (tableSort.sortKey === sortKey) {
      if (tableSort.direction === 'asc') {
        direction = 'desc';
      } else if (tableSort.direction === 'desc') {
        direction = null;
      }
    }

    setTableSort({ sortKey, direction });
  };

  // Function to sort data
  const sortData = (data: T[]): T[] => {
    if (!tableSort.sortKey || !tableSort.direction) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = a[tableSort.sortKey as keyof T];
      const bValue = b[tableSort.sortKey as keyof T];

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
    setTableSort({ sortKey: null, direction: null });
  };

  // Get sort indicator icon
  const getSortIcon = (sortKey: K) => {
    if (tableSort.sortKey !== sortKey) {
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
