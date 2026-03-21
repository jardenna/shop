import { useSearchParams } from 'react-router';
import { type ChangeInputType } from '../types/types';

type SearchParamState = Record<string, string | string[]>;

const isArray = (value: unknown): value is string[] => Array.isArray(value);

export const useSearchParamsState = <T extends SearchParamState>(
  defaults: T,
) => {
  const [searchParams, setSearchParams] = useSearchParams();

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
    const currentValues = updatedSearchParams
      .getAll(key)
      .filter((item) => item !== value);

    updatedSearchParams.delete(key);

    currentValues.forEach((item) => {
      updatedSearchParams.append(key, item);
    });

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

  return {
    values,
    toggleValue,
    setValue,
    onRemoveFilterTag: handleRemoveFilterTag,
    onClearAllFilters: handleClearAllFilters,
    onClearSingleFilter: handleClearSingleFilter,
  };
};
