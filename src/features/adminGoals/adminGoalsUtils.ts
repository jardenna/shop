import { IconName } from '../../components/icons/iconConstants';

export const kpiOptions = [
  {
    label: 'last7Days',
    value: '7',
  },
  {
    label: 'last30Days',
    value: '30',
  },
  {
    label: 'previousYear',
    value: '365',
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
