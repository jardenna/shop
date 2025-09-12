import { useEffect, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router';
import type { FilterKeys } from '../pages/CollectionPage';
import type { ChangeInputType } from '../types/types';

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
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    const paramsKeys = Array.from(searchParams.keys());
    const updatedFilters: Partial<FilterValuesType<string>> = {};

    (Object.keys(initialFiltersRef.current) as FilterKeys[]).forEach((key) => {
      if (!paramsKeys.includes(key)) {
        updatedFilters[key] = [];
      }
    });

    if (
      prevPathRef.current !== location.pathname ||
      Object.keys(updatedFilters).length > 0
    ) {
      setFilterValues({
        ...filterValues,
        ...updatedFilters,
      } as FilterValuesType<string>);
      prevPathRef.current = location.pathname;
    }
  }, [location.pathname, searchParams]);

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
      const params = new URLSearchParams();

      (Object.entries(filterValues) as [FilterKeys, string[]][]).forEach(
        ([key, values]) => {
          if (values.length) {
            params.set(key, values.join(','));
          }
        },
      );

      setSearchParams(params, { replace: true });
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
    const updatedFilters = {
      ...filterValues,
      [filterKey]: [],
    };
    setFilterValues(updatedFilters);
  };

  return {
    filterValues,
    onFilterChange: handleFilterChange,
    onRemoveFilterTag: handleRemoveFilterTag,
    onClearAllFilters: handleClearAllFilters,
    handleClearSingleFilter,
  };
};

export default useFilterParams;
