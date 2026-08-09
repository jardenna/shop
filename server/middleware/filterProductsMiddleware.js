function filterProductsMiddleware(req, res, next) {
  const {
    productName,
    maxPrice,
    minPrice,
    maxStock,
    minStock,
    minDiscount,
    maxDiscount,
    productStatus,
  } = req.query;

  let page = parseInt(req.query.page);
  let productsPerPage = parseInt(req.query.productsPerPage);

  if (isNaN(page) || page < 1) {
    page = 1;
  }
  if (isNaN(productsPerPage) || productsPerPage < 1 || productsPerPage > 100) {
    productsPerPage = 12;
  }

  const filter = {};

  // Search by productName using case-insensitive partial match (supports multiple values)
  if (productName) {
    const values = Array.isArray(productName)
      ? productName
      : productName.split(',');

    filter.$or = values.map((value) => ({
      productName: {
        $regex: value.trim(),
        $options: 'i',
      },
    }));
  }

  // Helper to normalize query param into array, optional type casting
  const parseToArray = (param, cast = 'string') => {
    if (!param) {
      return [];
    }
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

  // Pass through categoryName and subCategoryName for aggregation filtering
  if (req.query.categoryName) {
    req.query.categoryName = req.query.categoryName;
  }

  if (req.query.subCategoryName) {
    req.query.subCategoryName = req.query.subCategoryName;
  }

  // Filter by min/max price
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) {
      filter.price.$gte = Number(minPrice);
    }
    if (maxPrice) {
      filter.price.$lte = Number(maxPrice);
    }
  }

  // Filter by min/max countInStock
  if (minStock || maxStock) {
    filter.countInStock = {};
    if (minStock) {
      filter.countInStock.$gte = Number(minStock);
    }
    if (maxStock) {
      filter.countInStock.$lte = Number(maxStock);
    }
  }

  // Filter by min/max discount
  if (minDiscount || maxDiscount) {
    filter.discount = {};

    if (minDiscount) {
      filter.discount.$gte = Number(minDiscount);
    }

    if (maxDiscount) {
      filter.discount.$lte = Number(maxDiscount);
    }
  }

  // Filter by productStatus (e.g. 'Active', 'Archived', 'Scheduled')
  if (productStatus) {
    // Allow multiple values like 'Active,Scheduled'
    const statuses = productStatus.split(',').map((s) => s.trim());
    filter.productStatus = { $in: statuses };
  }

  req.pagination = { page, productsPerPage };
  req.filter = filter;

  next();
}

export default filterProductsMiddleware;
