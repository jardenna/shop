/* eslint-disable no-param-reassign */
import {
  mainCategoryValues,
  statusValues,
  subCategoryValues,
  roleValues,
} from '../../../app/api/apiConstants';
import { Roles, Status } from '../../../app/api/apiTypes/adminApiTypes';
import {
  MainCategoryNames,
  SubCategoryNames,
} from '../../../app/api/apiTypes/sharedApiTypes';
import { Options } from '../../../types/types';
import { Column } from '../Table';

export interface ListsMap {
  categoryName: readonly MainCategoryNames[];
  productStatus: readonly Status[];
  role: readonly Roles[];
  subCategoryName: readonly SubCategoryNames[];
}

const listsMap: ListsMap = {
  categoryName: mainCategoryValues,
  productStatus: statusValues,
  subCategoryName: subCategoryValues,
  role: roleValues,
};

type ListName = keyof ListsMap | 'categoryStatus';

const createOptions = (items: readonly string[]): Options[] =>
  items.map((item) => ({
    label: item,
    value: item,
  }));

export const getListByName = (name: ListName): Options[] => {
  if (name === 'categoryStatus') {
    return createOptions(statusValues);
  }

  return createOptions(listsMap[name]);
};

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
