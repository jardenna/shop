import User from '../models/userModel.js';

const filterOrdersMiddleware = async (req, res, next) => {
  const {
    customer: customerValue,
    paymentMethod: paymentMethodValue,
    paymentStatus: paymentStatusValue,
    deliveryStatus: deliveryStatusValue,
    createdAt: createdAtValue,
    id: idValue,
  } = req.query;

  const filter = {};

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

  if (customerValue) {
    const values = Array.isArray(customerValue)
      ? customerValue
      : customerValue.split(',');

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

  if (idValue) {
    filter.$expr = {
      $regexMatch: {
        input: { $toString: '$_id' },
        regex: idValue.trim(),
        options: 'i',
      },
    };
  }

  if (paymentMethodValue) {
    filter['payment.method'] = paymentMethodValue;
  }

  if (paymentStatusValue) {
    filter['payment.status'] = paymentStatusValue;
  }

  if (deliveryStatusValue) {
    filter['delivery.status'] = deliveryStatusValue;
  }

  req.filter = filter;

  next();
};

export default filterOrdersMiddleware;
