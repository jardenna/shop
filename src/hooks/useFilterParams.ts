import { useEffect, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router';
import type { FilterKeys } from '../pages/CollectionPage';
import type { ChangeInputType } from '../types/types';
import { pageParamKey } from '../utils/utils';

export type FilterValuesType<T> = {
  [K in FilterKeys]: T[];
};

const useFilterParams = (initialFilters: FilterValuesType<string>) => {
  const initialFiltersRef = useRef(initialFilters);
  const [filterValues, setFilterValues] = useState<FilterValuesType<string>>(
    initialFiltersRef.current,
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevFiltersRef = useRef<FilterValuesType<string>>(
    initialFiltersRef.current,
  );
  const { pathname } = useLocation();
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    const paramsKeys = Array.from(searchParams.keys());
    const updatedFilters: Partial<FilterValuesType<string>> = {};

    (Object.keys(initialFiltersRef.current) as FilterKeys[]).forEach((key) => {
      if (!paramsKeys.includes(key)) {
        updatedFilters[key] = [];
      }
    });

    if (
      prevPathRef.current !== pathname ||
      Object.keys(updatedFilters).length > 0
    ) {
      setFilterValues({
        ...filterValues,
        ...updatedFilters,
      } as FilterValuesType<string>);
      prevPathRef.current = pathname;
    }
  }, [pathname, searchParams]);

  // Sync filters from URL on mount
  useEffect(() => {
    const newFilters: FilterValuesType<string> = {
      ...initialFiltersRef.current,
    };
    (Object.keys(initialFiltersRef.current) as FilterKeys[]).forEach((key) => {
      const value = searchParams.get(key);
      if (value) {
        newFilters[key] = value.split(',');
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
      // Start from current params so unrelated keys (like "page") stay intact
      const params = new URLSearchParams(searchParams);

      // Remove all known filter keys before re-adding active ones
      (Object.keys(initialFiltersRef.current) as FilterKeys[]).forEach(
        (key) => {
          params.delete(key);
        },
      );

      // Add active filters again
      (Object.entries(filterValues) as [FilterKeys, string[]][]).forEach(
        ([key, values]) => {
          if (values.length) {
            params.set(key, values.join(','));
          }
        },
      );

      // Compare with previous filter values
      const prevFilters = prevFiltersRef.current;

      const normalize = (arr: string[]) => [...arr].sort().join('|');
      const filtersChanged = (Object.keys(filterValues) as FilterKeys[]).some(
        (key) => normalize(prevFilters[key]) !== normalize(filterValues[key]),
      );

      // Only reset page if filters actually changed
      if (filtersChanged) {
        params.delete(pageParamKey);
      }

      // Save new filters as the last known
      prevFiltersRef.current = filterValues;

      setSearchParams(Object.fromEntries(params.entries()), { replace: true });
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [filterValues, setSearchParams]);

  const handleFilterChange = (event: ChangeInputType) => {
    const { name, value, checked } = event.target;
    const key = name as FilterKeys;
    const current = filterValues[key];
    const updated = checked
      ? [...current, value]
      : current.filter((val) => val !== value);

    setFilterValues({
      ...filterValues,
      [name]: updated,
    });
  };

  const handleRemoveFilterTag = (key: FilterKeys, value: string) => {
    const current = filterValues[key];
    const updated = current.filter((val) => val !== value);

    setFilterValues({
      ...filterValues,
      [key]: updated,
    });
  };

  const handleClearAllFilters = () => {
    setFilterValues(initialFilters);
  };

  const handleClearSingleFilter = (filterKey: FilterKeys) => {
    setFilterValues({
      ...filterValues,
      [filterKey]: [],
    });
  };

  return {
    filterValues,
    onFilterChange: handleFilterChange,
    onRemoveFilterTag: handleRemoveFilterTag,
    onClearAllFilters: handleClearAllFilters,
    onClearSingleFilter: handleClearSingleFilter,
  };
};

export default useFilterParams;
