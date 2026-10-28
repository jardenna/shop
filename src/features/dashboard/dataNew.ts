import { KpiResponseNew } from './apiTypes';

export const dataNew: KpiResponseNew = {
  totals: [
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
        { date: '2026-10-22', current: 1200, previous: 900 },
        { date: '2026-10-23', current: 1500, previous: 1100 },
      ],
    },
    {
      key: 'totalOrders',
      title: 'totalOrders',
      description: 'totalOrdersDescription',
      total: 1240,
      chartData: [
        { date: '2026-10-22', current: 12, previous: 9 },
        { date: '2026-10-23', current: 15, previous: 11 },
      ],
    },
  ],

  periods: {
    7: [
      {
        key: 'newCustomers',
        title: 'newCustomers',
        description: 'newCustomersDescription',
        value: 3,
        goal: 5,
        changePercentage: 3,
      },
      {
        key: 'newRevenue',
        title: 'newRevenue',
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
        goal: 10,
        changePercentage: -3,
      },
    ],

    30: [
      {
        key: 'newCustomers',
        title: 'newCustomers',
        description: 'newCustomersDescription',
        value: 18,
        goal: 20,
        changePercentage: 12,
      },
      {
        key: 'newRevenue',
        title: 'newRevenue',
        description: 'revenueDescription',
        value: 18000,
        goal: 20000,
        changePercentage: 8,
      },
      {
        key: 'newOrders',
        title: 'newOrders',
        description: 'newOrdersDescription',
        value: 36,
        goal: 40,
        changePercentage: 6,
      },
    ],

    365: [
      {
        key: 'newCustomers',
        title: 'newCustomers',
        description: 'newCustomersDescription',
        value: 190,
        goal: 200,
        changePercentage: 15,
      },
      {
        key: 'newRevenue',
        title: 'newRevenue',
        description: 'revenueDescription',
        value: 220000,
        goal: 240000,
        changePercentage: 10,
      },
      {
        key: 'newOrders',
        title: 'newOrders',
        description: 'newOrdersDescription',
        value: 470,
        goal: 500,
        changePercentage: -2,
      },
    ],
  },
};
