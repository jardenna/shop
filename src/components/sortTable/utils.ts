const sortData = <T>(
  data: T[],
  sortConfig: { sortKey: keyof T; sortDirection: 'asc' | 'desc' } | null,
): T[] => {
  if (!sortConfig) {
    return data;
  }

  const { sortKey, sortDirection } = sortConfig;
  const order = sortDirection === 'asc' ? 1 : -1;

  return [...data].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) {
      return -1 * order;
    }
    if (a[sortKey] > b[sortKey]) {
      return 1 * order;
    }
    return 0;
  });
};

export default sortData;
