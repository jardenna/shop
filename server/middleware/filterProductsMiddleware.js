function filterProductsMiddleware(req, res, next) {
  let page = parseInt(req.query.page);
  let pageSize = parseInt(req.query.pageSize);

  if (isNaN(page) || page < 1) page = 1;
  if (isNaN(pageSize) || pageSize < 1 || pageSize > 100) pageSize = 12;

  const filter = {};

  // Search by productName using case-insensitive partial match
  if (req.query.productName) {
    filter.productName = { $regex: req.query.productName, $options: 'i' };
  }

  // Filter by colors (OR for multiple colors)
  if (req.query.colors) {
    const colors = req.query.colors.split(',').map((color) => color.trim());

    // Match array elements case-insensitively
    filter.colors = { $in: colors.map((c) => new RegExp(`^${c}$`, 'i')) };
  }

  // Exact match on subCategory (assuming it's an ID or slug)
  if (req.query.subCategory) {
    filter.subCategory = req.query.subCategory;
  }

  // Filter by min/max price
  if (req.query.minPrice || req.query.maxPrice) {
    filter.price = {};
    if (req.query.minPrice) filter.price.$gte = Number(req.query.minPrice);
    if (req.query.maxPrice) filter.price.$lte = Number(req.query.maxPrice);
  }

  // Filter by min/max countInStock
  if (req.query.minStock || req.query.maxStock) {
    filter.countInStock = {};
    if (req.query.minStock)
      filter.countInStock.$gte = Number(req.query.minStock);
    if (req.query.maxStock)
      filter.countInStock.$lte = Number(req.query.maxStock);
  }

  // Filter by productStatus (e.g. 'Active', 'Archived', 'Scheduled')
  if (req.query.productStatus) {
    // Allow multiple values like 'Active,Scheduled'
    const statuses = req.query.productStatus.split(',').map((s) => s.trim());
    filter.productStatus = { $in: statuses };
  }

  req.pagination = { page, pageSize };
  req.filter = filter;

  next();
}

export default filterProductsMiddleware;
