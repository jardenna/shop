import { useSearchParams } from 'react-router';
import { type ChangeInputType } from '../types/types';
import { pageParamKey, productsPerPageParamKey } from '../utils/utils';
const isArray = (value: unknown): value is string[] => Array.isArray(value);

type SearchParamValue = string | string[];

interface SearchParamsStateOptions {
  defaultItemsPerPage?: number;
  pagination?: boolean;
}

export const useSearchParamsState = <T extends object>(
  defaults: T,
  { defaultItemsPerPage = 8, pagination = true }: SearchParamsStateOptions = {},
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get(pageParamKey)) || 1;

  const itemsPerPage =
    Number(searchParams.get(productsPerPageParamKey)) || defaultItemsPerPage;

  const searchKey = searchParams.toString();

  const updateSearchParams = (params: URLSearchParams, resetPage = false) => {
    if (pagination && resetPage) {
      params.set(pageParamKey, '1');
    }

    setSearchParams(params);
  };

  const setPage = (pageNum: number) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(pageParamKey, pageNum.toString());
    setSearchParams(updatedParams);
  };

  const updatePagination = (pageNum: number, count: number) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(pageParamKey, pageNum.toString());
    updatedParams.set(productsPerPageParamKey, count.toString());
    setSearchParams(updatedParams);
  };

  const getParamValue = (
    key: string,
    defaultValue: SearchParamValue,
  ): SearchParamValue => {
    if (isArray(defaultValue)) {
      const values = searchParams.getAll(key);
      return values.length > 0 ? values : defaultValue;
    }

    return searchParams.get(key) ?? defaultValue;
  };

  const values = Object.fromEntries(
    (Object.entries(defaults) as [string, SearchParamValue][]).map(
      ([key, defaultValue]) => [key, getParamValue(key, defaultValue)],
    ),
  ) as T;

  // Set values for input textarea and select
  const setValue = (event: ChangeInputType) => {
    const { name, value } = event.target;
    const updatedParams = new URLSearchParams(searchParams);

    updatedParams.delete(name);

    const nextValues = isArray(value) ? value : [value];

    nextValues
      .filter((item) => item !== '')
      .forEach((item) => {
        updatedParams.append(name, item);
      });

    updateSearchParams(updatedParams, true);
  };

  // Set values for controls input
  const toggleValue = (event: ChangeInputType) => {
    const { name, value } = event.target;
    const currentValues = values[name as keyof T];

    if (!Array.isArray(currentValues)) {
      return;
    }

    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.delete(name);

    const nextValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : currentValues.concat(value);

    nextValues.forEach((item) => {
      updatedParams.append(name, item);
    });

    updateSearchParams(updatedParams, true);
  };

  // Remove tags
  const handleRemoveFilterTag = (key: string, value: string) => {
    const updatedParams = new URLSearchParams(searchParams);

    // Handle range keys like "minPrice-maxPrice"
    if (key.includes('-')) {
      const [minKey, maxKey] = key.split('-');

      updatedParams.delete(minKey);
      updatedParams.delete(maxKey);

      setSearchParams(updatedParams);
      return;
    }

    const remainingValues = updatedParams
      .getAll(key)
      .filter((item) => item !== value);

    updatedParams.delete(key);

    remainingValues.forEach((item) => {
      updatedParams.append(key, item);
    });

    updateSearchParams(updatedParams, true);
  };

  // Clear all filters
  const handleClearAllFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  // Clear single filter
  const handleClearSingleFilter = (keys: string | string[]) => {
    const updatedParams = new URLSearchParams(searchParams);
    const keysArray = Array.isArray(keys) ? keys : [keys];

    keysArray.forEach((key) => {
      updatedParams.delete(key);
    });

    setSearchParams(updatedParams);
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
    itemsPerPage,
    setPage,
    updatePagination,
    hasSearchParams,
  };
};
