import { IconName } from '../../types/enums';

export const days = [7, 30, 365];

export const kpi = ['newCustomers', 'orders', 'revenue'];

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
  newRevenue: IconName.Revenue,
  newOrders: IconName.NewOrders,
} as const;

export type KpiIconKey = keyof typeof kpiIcons;
