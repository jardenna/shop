import { DeliveryStatus } from '../../app/api/apiTypes/orderApiTypes';
import { IconName } from '../../types/enums';

interface OrderTrackingList {
  iconName: IconName;
  id: DeliveryStatus;
  label: string;
}

export const orderTrackingList: OrderTrackingList[] = [
  { id: 'created', label: 'orderCreated', iconName: IconName.Basket },
  {
    id: 'processing',
    label: 'orderInProgress',
    iconName: IconName.PackageOpen,
  },
  {
    id: 'shipped',
    label: 'orderShipped',
    iconName: IconName.Deliver,
  },
  {
    id: 'delivered',
    label: 'orderDelivered',
    iconName: IconName.Home,
  },
];
