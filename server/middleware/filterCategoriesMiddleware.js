import { getDayRange } from '../utils/dateUtils.js';

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

  // Filter by createdAt
  if (createdAt) {
    filter.createdAt = getDayRange(createdAt);
  }

  req.filter = filter;

  next();
}
