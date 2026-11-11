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
  if (isRead !== undefined) {
    filter.isRead = isRead === 'true';
  }

  // Filter by rating
  if (rating) {
    filter.rating = rating.split(',').map(Number);
  }

  req.filter = filter;

  next();
}

export default filterReviewsMiddleware;
