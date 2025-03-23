import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { ChangeInputType } from '../types/types';

interface TableFilterProps<T extends Record<string, any>> {
  filterKeys: string[];
  initialColumnFilters: T;
  initialSearch?: string;
}

function useTableFilter<T extends Record<string, any>>({
  initialSearch,
  filterKeys,
  initialColumnFilters,
}: TableFilterProps<T>) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize global search from URL params or defaults
  const [globalSearch, setGlobalSearch] = useState<string>(
    searchParams.get('search') || initialSearch || '',
  );

  // Initialize column filters from URL params or defaults
  const [columnFilters, setColumnFilters] = useState<T>(() => {
    // Create a new object to avoid modifying the original
    const filters = { ...initialColumnFilters };

    // Populate from URL params for each filter key
    Object.keys(initialColumnFilters).forEach((key) => {
      const paramValue = searchParams.get(key);
      if (paramValue) {
        // Use type assertion to help TypeScript understand this is safe
        (filters as Record<string, any>)[key] = paramValue;
      }
    });

    return filters;
  });

  // Sync URL params with state when column filters change
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);

    // Update or remove column filter params
    Object.entries(columnFilters).forEach(([key, value]) => {
      if (value && String(value).trim() !== '') {
        newParams.set(key, String(value));
      } else {
        newParams.delete(key);
      }
    });

    setSearchParams(newParams);
  }, [columnFilters, setSearchParams]);

  // Sync URL params with state when global search changes
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);

    if (globalSearch && globalSearch.trim() !== '') {
      newParams.set('search', globalSearch);
    } else {
      newParams.delete('search');
    }

    setSearchParams(newParams);
  }, [globalSearch, setSearchParams]);

  // Handle column filter change
  const handleFilterRows = (event: ChangeInputType) => {
    const { name, value } = event.target;
    setColumnFilters((prev) => {
      // Create a new object with the updated value
      const updated = { ...prev };
      // Use type assertion to help TypeScript understand this is safe
      (updated as Record<string, any>)[name] = value;
      return updated;
    });
  };

  // Handle global search input change
  const handleSearchChange = (event: ChangeInputType) => {
    const { value } = event.target;
    setGlobalSearch(value);
  };

  // Helper function to safely check if a value contains a search term
  const valueContains = (value: any, searchTerm: string): boolean => {
    if (value === null || value === undefined) {
      return false;
    }

    if (typeof value === 'string') {
      return value.toLowerCase().includes(searchTerm);
    }

    if (typeof value === 'number' || typeof value === 'boolean') {
      return String(value).toLowerCase().includes(searchTerm);
    }

    return false;
  };

  // Function to filter data
  const filterData = (data: T[]): T[] => {
    let filteredData = [...data];

    // Apply column filters first
    Object.entries(columnFilters).forEach(([key, value]) => {
      if (value && String(value).trim() !== '') {
        const filterValue = String(value).toLowerCase();
        filteredData = filteredData.filter((item) => {
          const itemValue = item[key as keyof T];
          return valueContains(itemValue, filterValue);
        });
      }
    });

    // Then apply global search if present
    if (globalSearch && globalSearch.trim() !== '' && filterKeys.length > 0) {
      const lowercaseSearch = globalSearch.toLowerCase();
      filteredData = filteredData.filter((item: T) =>
        filterKeys.some((key) => {
          const value = item[key];
          return valueContains(value, lowercaseSearch);
        }),
      );
    }

    return filteredData;
  };

  // Reset all filters
  const resetFilter = () => {
    setGlobalSearch('');
    setColumnFilters(initialColumnFilters);
    setSearchParams(new URLSearchParams());
  };

  return {
    value: globalSearch,
    values: columnFilters,
    onSearchChange: handleSearchChange,
    filterData,
    resetFilter,
    onFilterRows: handleFilterRows,
  };
}

export default useTableFilter;
