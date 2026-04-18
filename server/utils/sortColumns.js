export const sortColumns = ({ collection, sortField, sortOrder, language }) => {
  return [...collection].sort((firstItem, secondItem) => {
    let firstValue = firstItem[sortField];
    let secondValue = secondItem[sortField];

    // Handle translated fields (object with languages)
    if (
      firstValue &&
      typeof firstValue === 'object' &&
      language &&
      firstValue[language]
    ) {
      firstValue = firstValue[language];
      secondValue = secondValue?.[language];
    }

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

    // Fallback to string compare (locale aware)
    return (
      String(firstValue).localeCompare(String(secondValue), language) *
      sortOrder
    );
  });
};
