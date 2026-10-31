import { IconName } from '../../types/enums';

export const kpiOptions = [
  {
    label: 'last7Days',
    value: '7',
    id: '7',
  },
  {
    label: 'last30Days',
    value: '30',
    id: '30',
  },
  {
    label: 'previousYear',
    value: '365',
    id: '365',
  },
];

export const kpiIcons = {
  totalCustomers: IconName.Users,
  totalRevenue: IconName.Wallet,
  totalOrders: IconName.Orders,
  newCustomers: IconName.Account,
  revenue: IconName.Revenue,
  orders: IconName.NewOrders,
} as const;
