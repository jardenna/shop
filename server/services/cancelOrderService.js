import { DELIVERY_STATUS } from '../config/deliveryConstants.js';

export const cancelOrderService = async (order, userId, actorType) => {
  const deliveryStatus = order.delivery.status;

  if (
    deliveryStatus === DELIVERY_STATUS.SHIPPED ||
    deliveryStatus === DELIVERY_STATUS.CANCELLED ||
    deliveryStatus === DELIVERY_STATUS.DELIVERED
  ) {
    return false;
  }

  order.delivery.status = DELIVERY_STATUS.CANCELLED;

  order.delivery.statusHistory.push({
    status: DELIVERY_STATUS.CANCELLED,
    changedAt: new Date(),
    changedBy: userId,
    actorType,
  });

  // await order.save();

  return true;
};
