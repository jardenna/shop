import { KpiResponse } from '../dashboardGoals/dashboardGoalsUtils';

export const data: KpiResponse = {
  period: 7,
  kpis: [
    {
      key: 'totalCustomers',
      title: 'totalCustomers',
      description: 'totalCustomersDescription',
      total: 342,
      chartData: [
        { date: '2026-10-22', current: 2, previous: 1 },
        { date: '2026-10-23', current: 1, previous: 2 },
      ],
    },
    {
      key: 'totalRevenue',
      title: 'totalRevenue',
      description: 'totalRevenueDescription',
      total: 24567,
      chartData: [
        { date: '2026-10-22', current: 2, previous: 1 },
        { date: '2026-10-23', current: 1, previous: 2 },
      ],
    },
    {
      key: 'totalOrders',
      title: 'totalOrders',
      description: 'totalOrdersDescription',
      total: 1240,
      chartData: [
        { date: '2026-10-22', current: 2, previous: 1 },
        { date: '2026-10-23', current: 1, previous: 2 },
      ],
    },
    {
      key: 'newCustomers',
      title: 'newCustomers',
      description: 'newCustomersDescription',
      value: 3,
      total: 342,

      goal: 5,
      changePercentage: 3,
    },
    {
      key: 'newRevenue',
      title: 'newRevenue',
      total: 342,

      description: 'revenueDescription',
      value: 9000,
      goal: 10000,
      changePercentage: 5,
    },
    {
      key: 'newOrders',
      title: 'newOrders',
      description: 'newOrdersDescription',
      value: 8,
      total: 2,

      goal: 10,
      changePercentage: -3,
    },
  ],
};
