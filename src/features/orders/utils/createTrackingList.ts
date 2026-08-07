import { DeliveryStatus } from '../../../app/api/apiTypes/orderApiTypes';
import { IconName } from '../../../types/enums';

interface OrderTrackingList {
  iconName: IconName;
  id: DeliveryStatus;
  label: string;
}

export const orderTrackingList: OrderTrackingList[] = [
  { id: 'created', label: 'created', iconName: IconName.Basket },
  {
    id: 'processing',
    label: 'processing',
    iconName: IconName.PackageOpen,
  },
  {
    id: 'shipped',
    label: 'shipped',
    iconName: IconName.Deliver,
  },
  {
    id: 'delivered',
    label: 'delivered',
    iconName: IconName.Home,
  },
];
