export function filterCategoriesMiddleware(req, res, next) {
  const {
    status: statusValue,
    categoryName: categoryNameValue,
    createdAt: createdAtValue,
  } = req.query;

  const mongoQuery = {};

  // Filter by status (exact match)
  if (statusValue) {
    mongoQuery.categoryStatus = statusValue;
  }

  // Filter by category name (case-insensitive, partial match)
  if (categoryNameValue) {
    const escapedValue = categoryNameValue.replace(
      /[.*+?^${}()|[\]\\]/g,
      '\\$&',
    );

    mongoQuery.categoryName = {
      $regex: escapedValue,
      $options: 'i',
    };
  }

  // Filter by createdAt (expects YYYY-MM-DD or ISO string)
  if (createdAtValue) {
    const startDate = new Date(createdAtValue);
    const endDate = new Date(createdAtValue);

    // Normalize to full day range
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    mongoQuery.createdAt = {
      $gte: startDate,
      $lte: endDate,
    };
  }

  req.mongoQuery = mongoQuery;

  next();
}
