const sortData = <T>(
  data: T[],
  sortConfig: { key: keyof T; sortDirection: 'asc' | 'desc' } | null,
): T[] => {
  if (!sortConfig) {
    return data;
  }

  const { key, sortDirection } = sortConfig;
  const order = sortDirection === 'asc' ? 1 : -1;

  return [...data].sort((a, b) => {
    if (a[key] < b[key]) {
      return -1 * order;
    }
    if (a[key] > b[key]) {
      return 1 * order;
    }
    return 0;
  });
};

export default sortData;
