import { useSearchParams } from 'react-router';
import { type ChangeInputType } from '../types/types';

type SearchParamState = Record<string, string | string[]>;

const isArray = (value: unknown): value is string[] => Array.isArray(value);

const useSearchParamsState = <T extends SearchParamState>(defaults: T) => {
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

  const setEventValue = (event: ChangeInputType) => {
    const { name, value } = event.target;

    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.delete(name);

    const values = isArray(value) ? value : [value];
    values.forEach((val) => {
      updatedSearchParams.append(name, val);
    });

    setSearchParams(updatedSearchParams);
  };

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

  return { values, toggleValue, setEventValue };
};

export default useSearchParamsState;
