import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

export type SortDirection = 'asc' | 'desc' | null;

export function useTableSort<T, K extends keyof T>(
  initialSortKey: K | null = null,
  initialDirection: SortDirection = null,
) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize from URL params or defaults
  const [sortConfig, setSortConfig] = useState<{
    key: K | null;
    direction: SortDirection;
  }>({
    key: (searchParams.get('sortKey') as K) || initialSortKey,
    direction:
      (searchParams.get('sortDir') as SortDirection) || initialDirection,
  });

  // Update URL when sort changes
  useEffect(() => {
    const currentParams = Object.fromEntries(searchParams.entries());
    const newParams = { ...currentParams };

    if (sortConfig.key) {
      newParams.sortKey = String(sortConfig.key);
      if (sortConfig.direction) {
        newParams.sortDir = sortConfig.direction;
      } else {
        delete newParams.sortDir;
      }
    } else {
      delete newParams.sortKey;
      delete newParams.sortDir;
    }

    setSearchParams(newParams);
  }, [sortConfig, searchParams, setSearchParams]);

  // Handle sorting logic
  const handleSort = (key: K) => {
    let direction: SortDirection = 'asc';

    if (sortConfig.key === key) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc';
      } else if (sortConfig.direction === 'desc') {
        direction = null;
      }
    }

    setSortConfig({ key, direction });
  };

  // Function to sort data
  const sortData = (data: T[]): T[] => {
    if (!sortConfig.key || !sortConfig.direction) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof T];
      const bValue = b[sortConfig.key as keyof T];

      // Basic comparison for strings and numbers
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  // Reset sort function
  const resetSort = () => {
    setSortConfig({ key: null, direction: null });
  };

  // Get sort indicator icon
  const getSortIcon = (key: K) => {
    if (sortConfig.key !== key) {
      return '⇅';
    }
    if (sortConfig.direction === 'asc') {
      return '↑';
    }
    if (sortConfig.direction === 'desc') {
      return '↓';
    }
    return '⇅';
  };

  return {
    sortConfig,
    handleSort,
    sortData,
    resetSort,
    getSortIcon,
  };
}
