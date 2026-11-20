import type { DeliveryStatus } from '../../../app/api/apiTypes/orderApiTypes';
import type { IconNameValue } from '../../../shared/types';

interface OrderTrackingList {
  iconName: IconNameValue;
  id: DeliveryStatus;
  label: string;
}

export const orderTrackingList: OrderTrackingList[] = [
  { id: 'created', label: 'created', iconName: 'basket' },
  {
    id: 'processing',
    label: 'processing',
    iconName: 'packageOpen',
  },
  {
    id: 'shipped',
    label: 'shipped',
    iconName: 'deliver',
  },
  {
    id: 'delivered',
    label: 'delivered',
    iconName: 'home',
  },
];
