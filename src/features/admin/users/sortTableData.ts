import { DirectionType } from '../../../types/types';

const sortTableData = <T extends Record<string, any>>(
  data: T[],
  key: string,
  direction: DirectionType,
): T[] => {
  if (data.length === 0) {
    return [];
  }

  return [...data].sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return direction === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return direction === 'asc' ? valueA - valueB : valueB - valueA;
    }

    return 0; // Default case for mixed/unhandled types
  });
};

export default sortTableData;
