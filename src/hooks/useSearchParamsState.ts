import { useSearchParams } from 'react-router';
import { type ChangeInputType } from '../types/types';
import { pageParamKey, productsPerPageParamKey } from '../utils/utils';

type SearchParamState = Record<string, string | string[]>;

const isArray = (value: unknown): value is string[] => Array.isArray(value);

export const useSearchParamsState = <T extends SearchParamState>(
  defaults: T,
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get(pageParamKey)) || 1;
  const productsPerPage =
    Number(searchParams.get(productsPerPageParamKey)) || 8;

  const searchKey = searchParams.toString();

  const setPage = (pageNum: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(pageParamKey, pageNum.toString());
    setSearchParams(newParams);
  };

  const updatePagination = (pageNum: number, count: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(pageParamKey, pageNum.toString());
    newParams.set(productsPerPageParamKey, count.toString());
    setSearchParams(newParams);
  };

  const getParamValue = (key: string, defaultValue: string | string[]) => {
    if (isArray(defaultValue)) {
      const allValues = searchParams.getAll(key);
      return allValues.length > 0 ? allValues : defaultValue;
    }
    return searchParams.get(key) ?? defaultValue;
  };

  const values = Object.fromEntries(
    Object.entries(defaults).map(([key, defaultValue]) => [
      key,
      getParamValue(key, defaultValue),
    ]),
  ) as T;

  // Set values for input textarea and select
  const setValue = (event: ChangeInputType) => {
    const { name, value } = event.target;

    const updatedSearchParams = new URLSearchParams(searchParams.toString());

    // Reset page inside SAME update
    updatedSearchParams.set(pageParamKey, '1');

    updatedSearchParams.delete(name);

    const values = isArray(value) ? value : [value];
    const validValues = values.filter((val) => val !== '');

    if (validValues.length === 0) {
      setSearchParams(updatedSearchParams);
      return;
    }

    validValues.forEach((val) => {
      updatedSearchParams.append(name, val);
    });

    setSearchParams(updatedSearchParams);
  };

  // Set values for controls input
  const toggleValue = (event: ChangeInputType) => {
    const { name, value } = event.target;

    const updatedSearchParams = new URLSearchParams(searchParams.toString());

    updatedSearchParams.set(pageParamKey, '1');

    const current = values[name] as string[];

    updatedSearchParams.delete(name);

    if (!current.includes(value)) {
      [...current, value].forEach((val) => {
        updatedSearchParams.append(name, val);
      });
    } else {
      current
        .filter((val) => val !== value)
        .forEach((val) => {
          updatedSearchParams.append(name, val);
        });
    }

    setSearchParams(updatedSearchParams);
  };

  // Remove tags
  const handleRemoveFilterTag = (key: string, value: string) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());

    // Handle range keys like "minPrice-maxPrice"
    if (key.includes('-')) {
      const [minKey, maxKey] = key.split('-');

      updatedSearchParams.delete(minKey);
      updatedSearchParams.delete(maxKey);

      setSearchParams(updatedSearchParams);
      return;
    }

    const currentValues = updatedSearchParams
      .getAll(key)
      .filter((item) => item !== value);

    updatedSearchParams.delete(key);

    currentValues.forEach((item) => {
      updatedSearchParams.append(key, item);
    });

    updatedSearchParams.set(pageParamKey, '1');

    setSearchParams(updatedSearchParams);
  };

  // Clear all filters
  const handleClearAllFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  // Clear single filter
  const handleClearSingleFilter = (keys: string | string[]) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    const keysArray = Array.isArray(keys) ? keys : [keys];

    keysArray.forEach((key) => {
      updatedSearchParams.delete(key);
    });

    setSearchParams(updatedSearchParams);
  };

  const hasSearchParams = searchParams.size > 0;

  return {
    filterParams: values,
    searchKey,
    toggleFilterParam: toggleValue,
    setFilterParams: setValue,
    onRemoveFilterTag: handleRemoveFilterTag,
    onClearAllFilters: handleClearAllFilters,
    onClearSingleFilter: handleClearSingleFilter,
    page,
    productsPerPage,
    setPage,
    updatePagination,
    hasSearchParams,
  };
};
