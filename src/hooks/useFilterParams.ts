import { useEffect, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router';
import type { ChangeInputType } from '../types/types';

export type FilterValuesType = {
  brand: string[];
  colors: string[];
  sizes: string[];
};

const useFilterParams = (initialFilters: FilterValuesType) => {
  const [filterValues, setFilterValues] =
    useState<FilterValuesType>(initialFilters);
  const [searchParams, setSearchParams] = useSearchParams();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  // Reset filters on categoryId change or when query params are removed
  useEffect(() => {
    const paramsKeys = Array.from(searchParams.keys());
    const noParamsLeft = Object.keys(initialFilters).every(
      (key) => !paramsKeys.includes(key),
    );

    // Reset if category changed or all filter params are gone
    if (prevPathRef.current !== location.pathname || noParamsLeft) {
      setFilterValues({
        brand: [],
        colors: [],
        sizes: [],
      });
      prevPathRef.current = location.pathname;
    }
  }, [location.pathname, searchParams]);

  // Sync initial filters from URL on mount
  useEffect(() => {
    const newFilters: FilterValuesType = { ...initialFilters };
    Object.keys(initialFilters).forEach((key) => {
      const value = searchParams.get(key);
      if (value) {
        newFilters[key as keyof FilterValuesType] = value.split(',');
      }
    });
    setFilterValues(newFilters);
  }, []);

  // Update URL whenever filters change (debounced for better performance)
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      Object.entries(filterValues).forEach(([key, values]) => {
        if (values.length) {
          params.set(key, values.join(','));
        } else {
          params.delete(key);
        }
      });

      setSearchParams(params);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [filterValues]);

  const handleFilterChange = (event: ChangeInputType) => {
    const { name, value, checked } = event.target;
    const current = filterValues[name as keyof FilterValuesType];
    const updated = checked
      ? [...current, value]
      : current.filter((val) => val !== value);

    setFilterValues({
      ...filterValues,
      [name]: updated,
    });
  };

  return { filterValues, onFilterChange: handleFilterChange };
};

export default useFilterParams;
