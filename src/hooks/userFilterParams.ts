import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { ChangeInputType } from '../types/types';

export type FilterValuesType = {
  brand: string[];
  colors: string[];
  sizes: string[];
};

const userFilterParams = (initialFilters: FilterValuesType) => {
  const [filterValues, setFilterValues] =
    useState<FilterValuesType>(initialFilters);
  const [searchParams, setSearchParams] = useSearchParams();

  // Sync initial filters from URL on mount
  useEffect(() => {
    const newFilters: FilterValuesType = { ...initialFilters };
    Object.keys(initialFilters).forEach((key) => {
      const value = searchParams.get(key);
      if (value) {
        newFilters[key as keyof FilterValuesType] = value.split(','); // parse comma-separated values
      }
    });
    setFilterValues(newFilters);
  }, []);

  // Update URL whenever filters change
  useEffect(() => {
    const params: Record<string, string> = {};
    Object.entries(filterValues).forEach(([key, values]) => {
      if (values.length) {
        params[key] = values.join(',');
      }
    });
    setSearchParams(params);
  }, [filterValues]);

  const handleFilterChange = (event: ChangeInputType) => {
    const { name, value, checked } = event.target as HTMLInputElement;

    setFilterValues((prev) => {
      const current = prev[name as keyof FilterValuesType];
      const updated = checked
        ? [...current, value]
        : current.filter((v) => v !== value);
      return { ...prev, [name]: updated };
    });
  };

  return { filterValues, handleFilterChange };
};

export default userFilterParams;
