import User from '../models/userModel.js';

const filterOrdersMiddleware = async (req, res, next) => {
  const {
    customer,
    paymentMethod,
    paymentStatus,
    deliveryStatus,
    createdAt,
    id,
    minTotalPrice,
    maxTotalPrice,
  } = req.query;

  let page = parseInt(req.query.page);
  let ordersPerPage = parseInt(req.query.ordersPerPage);

  if (isNaN(page) || page < 1) {
    page = 1;
  }

  if (isNaN(ordersPerPage) || ordersPerPage < 1 || ordersPerPage > 100) {
    ordersPerPage = 12;
  }

  const filter = {};

  // Filter by createdAt
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

  // Filter by user
  if (customer) {
    const values = Array.isArray(customer) ? customer : customer.split(',');

    const users = await User.find({
      $or: values.map((value) => ({
        username: {
          $regex: value.trim(),
          $options: 'i',
        },
      })),
    }).select('_id');

    filter.user = {
      $in: users.map((user) => user._id),
    };
  }

  // Filter by min/max price
  if (minTotalPrice || maxTotalPrice) {
    filter['summary.totalPrice'] = {};

    if (minTotalPrice) {
      filter['summary.totalPrice'].$gte = Number(minTotalPrice);
    }

    if (maxTotalPrice) {
      filter['summary.totalPrice'].$lte = Number(maxTotalPrice);
    }
  }

  // Filter by order id
  if (id) {
    filter.$expr = {
      $regexMatch: {
        input: { $toString: '$_id' },
        regex: id.trim(),
        options: 'i',
      },
    };
  }

  if (paymentMethod) {
    filter['payment.method'] = paymentMethod;
  }

  if (paymentStatus) {
    filter['payment.status'] = paymentStatus;
  }

  if (deliveryStatus) {
    filter['delivery.status'] = deliveryStatus;
  }

  req.pagination = { page, ordersPerPage };
  req.filter = filter;

  next();
};

export default filterOrdersMiddleware;
