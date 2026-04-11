/* eslint-disable no-param-reassign */
import { Column } from '../Table';

export interface InitialTableFilters {
  [key: string]: string | string[];
}

export const createInitialFilters = <T>(
  headers: Column<T>[],
): InitialTableFilters =>
  headers.reduce<InitialTableFilters>((accumulator, header) => {
    if (!header.tableFilterType) {
      return accumulator;
    }

    const keyName = header.key as string;

    switch (header.tableFilterType) {
      case 'radio':
        accumulator[keyName] = [];
        break;

      case 'number': {
        const capitalizedKey =
          keyName.charAt(0).toUpperCase() + keyName.slice(1);

        accumulator[`min${capitalizedKey}`] = '';
        accumulator[`max${capitalizedKey}`] = '';
        break;
      }

      case 'text':
      case 'date':
        // single value inputs
        accumulator[keyName] = '';
        break;
    }

    return accumulator;
  }, {});

export const getMinMaxKeys = (columnKey: string) => {
  const capitalizedKey = columnKey.charAt(0).toUpperCase() + columnKey.slice(1);

  return {
    minKey: `min${capitalizedKey}`,
    maxKey: `max${capitalizedKey}`,
  };
};
