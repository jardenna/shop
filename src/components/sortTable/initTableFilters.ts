/* eslint-disable no-param-reassign */

import { InputType } from '../../types/types';

interface InitialFilters {
  [key: string]: string | string[];
}

interface TableHeader<T> {
  key: keyof T;
  label: string;
  name: string;
  tableSearchType?: InputType;
}

export function createInitialFilters<T>(
  headers: TableHeader<T>[],
): InitialFilters {
  return headers.reduce<InitialFilters>((accumulator, header) => {
    if (!header.tableSearchType) {
      return accumulator;
    }

    const keyName = header.key as string;

    switch (header.tableSearchType) {
      case 'radio':
        // single selectable but often used like filter groups → array
        accumulator[keyName] = [];
        break;

      case 'number':
      case 'text':
      case 'date':
        // single value inputs
        accumulator[keyName] = '';
        break;
    }

    return accumulator;
  }, {});
}
