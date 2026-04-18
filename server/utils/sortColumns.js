export const sortColumns = ({ collection, sortField, sortOrder }) => {
  return [...collection].sort((firstItem, secondItem) => {
    const firstValue = firstItem[sortField];
    const secondValue = secondItem[sortField];

    // Handle date strings (ISO expected)
    if (sortField === 'createdAt') {
      return (
        (new Date(firstValue).getTime() - new Date(secondValue).getTime()) *
        sortOrder
      );
    }

    // Handle numbers
    if (typeof firstValue === 'number' && typeof secondValue === 'number') {
      return (firstValue - secondValue) * sortOrder;
    }

    // Fallback to string compare
    return String(firstValue).localeCompare(String(secondValue)) * sortOrder;
  });
};
