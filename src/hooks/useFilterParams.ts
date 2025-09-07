import { useEffect, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router';
import type { ChangeInputType } from '../types/types';

// export type FilterValuesType = {
//   brand: string[];
//   colors: string[];
//   sizes: string[];
// };

export type FilterValuesType = {
  [key: string]: string[];
};

const useFilterParams = (initialFilters: FilterValuesType) => {
  const initialFiltersRef = useRef(initialFilters);
  const [filterValues, setFilterValues] = useState<FilterValuesType>(
    initialFiltersRef.current,
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  // Reset missing filters when pathname changes or filter params disappear
  useEffect(() => {
    const paramsKeys = Array.from(searchParams.keys());
    const updatedFilters: Partial<FilterValuesType> = {};

    Object.keys(initialFiltersRef.current).forEach((key) => {
      if (!paramsKeys.includes(key)) {
        updatedFilters[key as keyof FilterValuesType] = [];
      }
    });

    if (
      prevPathRef.current !== location.pathname ||
      Object.keys(updatedFilters).length > 0
    ) {
      setFilterValues({
        ...filterValues,
        ...updatedFilters,
      } as FilterValuesType);
      prevPathRef.current = location.pathname;
    }
  }, [location.pathname, searchParams]);

  // Sync initial filters from URL on mount
  useEffect(() => {
    const newFilters: FilterValuesType = { ...initialFiltersRef.current };
    Object.keys(initialFiltersRef.current).forEach((key) => {
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

      setSearchParams(params, { replace: true });
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [filterValues, searchParams, setSearchParams]);

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
