/* eslint-disable no-param-reassign */
import { Column } from '../Table';

export type InitialTableFilters<T> = {
  [Key in Extract<keyof T, string>]: string;
} & {
  [key: `min${string}`]: string;
} & {
  [key: `max${string}`]: string;
};

type MutableFilters = Record<string, string>;

export const createInitialFilters = <T>(
  headers: Column<T>[],
): InitialTableFilters<T> =>
  headers.reduce<MutableFilters>((accumulator, header) => {
    if (!header.tableFilterType) {
      return accumulator;
    }

    const keyName = header.name;

    switch (header.tableFilterType) {
      case 'radio':
      case 'text':
      case 'date':
        accumulator[keyName] = '';
        break;

      case 'number': {
        const capitalizedKey =
          keyName.charAt(0).toUpperCase() + keyName.slice(1);

        accumulator[`min${capitalizedKey}`] = '';
        accumulator[`max${capitalizedKey}`] = '';
        break;
      }
    }

    return accumulator;
  }, {}) as InitialTableFilters<T>;

export const getMinMaxKeys = <T extends string>(columnKey: T) => {
  const capitalizedKey = columnKey.charAt(0).toUpperCase() + columnKey.slice(1);

  return {
    minKey: `min${capitalizedKey}` as `min${Capitalize<T>}`,
    maxKey: `max${capitalizedKey}` as `max${Capitalize<T>}`,
  };
};
