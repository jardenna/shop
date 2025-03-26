import { SortDirection } from './SortTable';

const sortData = <T>(
  data: T[],
  sortConfig: { sortKey: keyof T; sortDirection: SortDirection } | null,
): T[] => {
  if (!sortConfig) {
    return data;
  }

  const { sortKey, sortDirection } = sortConfig;
  const order = sortDirection === 'asc' ? 1 : -1;

  const sortedData = [...data].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) {
      return -1 * order;
    }
    if (a[sortKey] > b[sortKey]) {
      return 1 * order;
    }
    return 0;
  });

  return sortedData;
};

export const getSortIcon = <T>(
  key: keyof T,
  sortConfig: { sortKey: keyof T; sortDirection: SortDirection } | null,
) => {
  if (!sortConfig || sortConfig.sortKey !== key) {
    return '⇅';
  }
  return sortConfig.sortDirection === 'asc' ? '↑' : '↓';
};

export const getSortDirection = <T>(
  key: keyof T,
  sortConfig: { sortKey: keyof T; sortDirection: SortDirection } | null,
) => {
  if (!sortConfig || sortConfig.sortKey !== key) {
    return '';
  }
  return sortConfig.sortDirection === 'asc' ? 'asc' : 'desc';
};

// export const getSortMeta = <T>(
//   key: keyof T,
//   sortConfig: { sortKey: keyof T; sortDirection: SortDirection } | null,
// ) => {
//   if (!sortConfig || sortConfig.sortKey !== key) {
//     return { icon: '⇅', direction: '' };
//   }
//   return {
//     icon: sortConfig.sortDirection === 'asc' ? '↑' : '↓',
//     direction: sortConfig.sortDirection === 'asc' ? 'asc' : 'desc',
//   };
// };

export default sortData;
