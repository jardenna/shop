export function filterCategoriesMiddleware(req, res, next) {
  const { categoryStatus, categoryName, subCategoryName, createdAt } =
    req.query;

  const filter = {};

  // Filter by status (exact match)
  if (categoryStatus) {
    filter.categoryStatus = categoryStatus;
  }

  // Filter by category name
  if (categoryName) {
    filter.categoryName = categoryName;
  }

  if (subCategoryName) {
    filter.subCategoryName = subCategoryName;
  }

  // Filter by createdAt (expects YYYY-MM-DD or ISO string)
  if (createdAt) {
    const startDate = new Date(createdAt);
    const endDate = new Date(createdAt);

    // Normalize to full day range
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    filter.createdAt = {
      $gte: startDate,
      $lte: endDate,
    };
  }

  req.filter = filter;

  next();
}
