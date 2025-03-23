/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { ChangeInputType } from '../types/types';

function useTableFilter<T>(
  initialState: string = '',
  filterKeys: (keyof T)[] = [],
) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize from URL params or defaults
  const [value, setValue] = useState<string>(
    searchParams.get('search') || initialState,
  );

  // Update URL when search changes
  useEffect(() => {
    const currentParams = Object.fromEntries(searchParams.entries());
    const newParams = { ...currentParams };

    if (value) {
      newParams.search = value;
    } else {
      delete newParams.search;
    }

    setSearchParams(newParams);
  }, [value, searchParams, setSearchParams]);

  // Handle search input change
  const handleSearchChange = (event: ChangeInputType) => {
    const { value } = event.target;
    setValue(value);
  };

  // Function to filter data
  const filterData = <T>(data: T[]): T[] => {
    if (!value || filterKeys.length === 0) {
      return data;
    }

    const lowercaseSearch = value.toLowerCase();

    return data.filter((item: T) =>
      filterKeys.some((key) => {
        const value = item[key as unknown as keyof T];
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
    setValue('');
  };

  return {
    value,
    onSearchChange: handleSearchChange,
    filterData,
    resetFilter,
  };
}

export default useTableFilter;
