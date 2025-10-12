function filterProductsMiddleware(req, res, next) {
  let page = parseInt(req.query.page);
  let productsPerPage = parseInt(req.query.productsPerPage);

  if (isNaN(page) || page < 1) page = 1;
  if (isNaN(productsPerPage) || productsPerPage < 1 || productsPerPage > 100)
    productsPerPage = 12;

  const filter = {};

  // Search by productName using case-insensitive partial match
  if (req.query.productName) {
    filter.productName = { $regex: req.query.productName, $options: 'i' };
  }

  // Helper to normalize query param into array, optional type casting
  const parseToArray = (param, cast = 'string') => {
    if (!param) return [];
    const arr = Array.isArray(param)
      ? param.map((v) => v.trim())
      : param.split(',').map((v) => v.trim());

    if (cast === 'number') {
      return arr.map((v) => Number(v)).filter((n) => !isNaN(n));
    }

    return arr;
  };

  // Config: field -> cast type
  const filterConfig = {
    colors: 'string',
    brand: 'string',
    sizes: 'string',
  };

  // Apply filters dynamically
  Object.entries(filterConfig).forEach(([field, cast]) => {
    if (req.query[field]) {
      const values = parseToArray(req.query[field], cast);

      // For string-based fields use regex matching (case-insensitive)
      if (cast === 'string') {
        filter[field] = { $in: values.map((v) => new RegExp(`^${v}$`, 'i')) };
      }

      // For number-based fields use direct values
      if (cast === 'number') {
        filter[field] = { $in: values };
      }
    }
  });

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

  req.pagination = { page, productsPerPage };
  req.filter = filter;

  next();
}

export default filterProductsMiddleware;
