export const sortRows = (rowsArray, sortField, sortOrder) => {
  const orderValue = sortOrder === 'desc' ? -1 : 1;

  return [...rowsArray].sort((rowA, rowB) => {
    // Handle date fields explicitly
    if (sortField === 'createdAt') {
      return (
        (new Date(rowA.createdAt).getTime() -
          new Date(rowB.createdAt).getTime()) *
        orderValue
      );
    }

    // Handle numbers
    if (typeof rowA[sortField] === 'number') {
      return (rowA[sortField] - rowB[sortField]) * orderValue;
    }

    // Fallback to string comparison
    return (
      String(rowA[sortField]).localeCompare(String(rowB[sortField])) *
      orderValue
    );
  });
};
