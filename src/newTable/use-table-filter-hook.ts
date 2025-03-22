/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

function useTableFilter<T>(
  initialSearchTerm: string = '',
  filterKeys: (keyof T)[] = [],
) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize from URL params or defaults
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get('search') || initialSearchTerm,
  );

  // Update URL when search changes
  useEffect(() => {
    const currentParams = Object.fromEntries(searchParams.entries());
    const newParams = { ...currentParams };

    if (searchTerm) {
      newParams.search = searchTerm;
    } else {
      delete newParams.search;
    }

    setSearchParams(newParams);
  }, [searchTerm, searchParams, setSearchParams]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Function to filter data
  const filterData = <T>(data: T[]): T[] => {
    if (!searchTerm || filterKeys.length === 0) {
      return data;
    }

    const lowercaseSearch = searchTerm.toLowerCase();

    return data.filter((item: any) =>
      filterKeys.some((key) => {
        const value = item[key];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(lowercaseSearch);
        }
        if (typeof value === 'number' || typeof value === 'boolean') {
          return String(value).toLowerCase().includes(lowercaseSearch);
        }
        return false;
      }),
    );
  };

  // Reset filter function
  const resetFilter = () => {
    setSearchTerm('');
  };

  return {
    searchTerm,
    handleSearchChange,
    filterData,
    resetFilter,
  };
}

export default useTableFilter;
