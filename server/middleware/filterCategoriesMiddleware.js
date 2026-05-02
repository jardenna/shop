export function filterCategoriesMiddleware(req, res, next) {
  const {
    categoryStatus: statusValue,
    categoryName: categoryNameValue,
    subCategoryName: subCategoryNameValue,
    createdAt: createdAtValue,
  } = req.query;

  const mongoQuery = {};

  // Filter by status (exact match)
  if (statusValue) {
    mongoQuery.categoryStatus = statusValue;
  }

  // Filter by category name
  if (categoryNameValue) {
    mongoQuery.categoryName = categoryNameValue;
  }

  if (subCategoryNameValue) {
    mongoQuery.subCategoryName = subCategoryNameValue;
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
