export type DirectionType = 'asc' | 'desc';
export enum DirectionEnum {
  Asc = 'asc',
  Desc = 'desc',
}

const sortTableData = <T extends Record<string, any>>(
  data: T[],
  key: string,
  direction: DirectionEnum,
): T[] => {
  if (data.length === 0) {
    return [];
  }

  return [...data].sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return direction === DirectionEnum.Asc
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return direction === DirectionEnum.Asc
        ? valueA - valueB
        : valueB - valueA;
    }

    return 0; // Default case for mixed/unhandled types
  });
};

export default sortTableData;
