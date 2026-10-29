import { IconName } from '../../types/enums';

export const kpiOptions = [
  {
    label: 'Seneste 7 dage',
    value: '7',
    id: '7',
  },
  {
    label: 'Seneste 30 dage',
    value: '30',
    id: '30',
  },
  {
    label: 'Forrige år',
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
