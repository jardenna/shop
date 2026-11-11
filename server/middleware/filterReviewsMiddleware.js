function filterReviewsMiddleware(req, res, next) {
  const { productName, isRead, rating } = req.query;

  const filter = {};

  // Filter by product name (case-insensitive, partial match)
  if (productName) {
    filter.productName = {
      $regex: productName.trim(),
      $options: 'i',
    };
  }

  // Filter by read status
  if (isRead === 'read') {
    filter.isRead = true;
  } else if (isRead === 'unread') {
    filter.isRead = false;
  }

  // Filter by rating
  if (rating) {
    filter.rating = rating
      .split(',')
      .map(Number)
      .filter((value) => Number.isInteger(value) && value >= 1 && value <= 5);
  }

  req.filter = filter;

  next();
}

export default filterReviewsMiddleware;
