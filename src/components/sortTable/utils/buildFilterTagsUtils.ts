import type { TagItem } from '../../tags/TagList';
import type { Column } from '../SortTable';
import { type InitialTableFilters, getMinMaxKeys } from './tableFiltersUtils';

export const buildFilterTagsUtils = <T>(
  tableHeaders: Column<T>[],
  filters: InitialTableFilters<T>,
): TagItem[] =>
  tableHeaders.flatMap((header) => {
    if (!header.name || !header.tableFilterType) {
      return [];
    }

    const keyName = header.name as Extract<keyof T, string>;

    if (header.tableFilterType === 'number') {
      const { minKey, maxKey } = getMinMaxKeys(keyName);

      const minValue = filters[minKey];
      const maxValue = filters[maxKey];

      if (!minValue && !maxValue) {
        return [];
      }

      return [
        {
          key: `${minKey}-${maxKey}`,
          label: header.label,
          value: `${String(minValue || '0')} - ${String(maxValue || '∞')}`,
        },
      ];
    }

    const filterValue = filters[keyName];

    if (!filterValue) {
      return [];
    }

    return [
      {
        key: header.key,
        label: header.label,
        value: filterValue,
      },
    ];
  });
