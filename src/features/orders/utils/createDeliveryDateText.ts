import { addBusinessDays } from 'date-fns';
import { Delivery } from '../../../app/api/apiTypes/orderApiTypes';

export const createDeliveryDateText = (delivery: Delivery) => {
  const currentDate = new Date();
  const latestHistory = delivery.statusHistory.at(-1);
  switch (delivery.status) {
    case 'created':
      return {
        text: 'estimatedDelivery',
        date: addBusinessDays(currentDate, 4),
      };
    case 'delivered':
      return {
        text: 'delivered',
        date: latestHistory?.changedAt ?? null,
      };
    case 'shipped':
      return {
        text: 'estimatedDelivery',
        date: latestHistory?.changedAt,
      };
    case 'cancelled':
      return {
        text: 'cancelled',
        date: latestHistory?.changedAt,
      };
    case 'processing':
      return {
        text: 'estimatedDelivery',
        date: addBusinessDays(currentDate, 3),
      };

    default:
      throw new Error(`Unsupported delivery status: ${delivery.status}`);
  }
};
