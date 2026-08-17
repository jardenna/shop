import { addBusinessDays, isAfter } from 'date-fns';
import { DELIVERY_STATUS } from '../config/deliveryConstants.js';

export const deliveryService = async ({ delivery }) => {
  if (delivery.status === DELIVERY_STATUS.SHIPPED) {
    const deliveryDate = addBusinessDays(delivery.shippedAt, 3);
    const isCurrentdateAfter = isAfter(new Date(), new Date(deliveryDate));
    console.log(isCurrentdateAfter);

    if (isCurrentdateAfter) {
      return {
        status: DELIVERY_STATUS.DELIVERED,
        changedAt: deliveryDate,
        changedBy: ACTOR_TYPE.SYSTEM,
        actorType: ACTOR_TYPE.CUSTOMER,
      };
    }
  }
  return {
    status: DELIVERY_STATUS.ORDER_CREATED,
    changedAt: order.createdAt,
    changedBy: order.user,
    actorType: ACTOR_TYPE.CUSTOMER,
  };
};
