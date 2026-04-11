/* eslint-disable no-param-reassign */
import { Column } from '../Table';

interface InitialFilters {
  [key: string]: string | string[];
}

export function createInitialFilters<T>(headers: Column<T>[]): InitialFilters {
  return headers.reduce<InitialFilters>((accumulator, header) => {
    if (!header.tableFilterType) {
      return accumulator;
    }

    const keyName = header.key as string;

    switch (header.tableFilterType) {
      case 'radio':
        // single selectable but often used like filter groups → array
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
}
