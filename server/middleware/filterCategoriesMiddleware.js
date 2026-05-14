export function filterCategoriesMiddleware(req, res, next) {
  const {
    categoryStatus: statusValue,
    categoryName: categoryNameValue,
    subCategoryName: subCategoryNameValue,
    createdAt: createdAtValue,
  } = req.query;

  const filter = {};

  // Filter by status (exact match)
  if (statusValue) {
    filter.categoryStatus = statusValue;
  }

  // Filter by category name
  if (categoryNameValue) {
    filter.categoryName = categoryNameValue;
  }

  if (subCategoryNameValue) {
    filter.subCategoryName = subCategoryNameValue;
  }

  // Filter by createdAt (expects YYYY-MM-DD or ISO string)
  if (createdAtValue) {
    const startDate = new Date(createdAtValue);
    const endDate = new Date(createdAtValue);

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
