import { addBusinessDays, isAfter, isEqual } from 'date-fns';
import { ACTOR_TYPE, DELIVERY_STATUS } from '../config/deliveryConstants.js';

export const deliveryService = async (order) => {
  const { delivery } = order;

  if (delivery.status !== DELIVERY_STATUS.SHIPPED || !delivery.shippedAt) {
    return false;
  }

  const deliveryDate = addBusinessDays(delivery.shippedAt, 3);
  const currentDate = new Date();

  if (
    !isAfter(currentDate, deliveryDate) &&
    !isEqual(currentDate, deliveryDate)
  ) {
    return false;
  }

  delivery.status = DELIVERY_STATUS.DELIVERED;
  delivery.deliveredAt = deliveryDate;
  delivery.statusHistory.push({
    status: DELIVERY_STATUS.DELIVERED,
    changedAt: deliveryDate,
    actorType: ACTOR_TYPE.SYSTEM,
  });

  await order.save();

  return true;
};
