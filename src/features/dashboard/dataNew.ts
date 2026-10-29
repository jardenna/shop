import { KpiResponse } from './apiTypes';

export const dataNew: KpiResponse = {
  totals: [
    {
      key: 'totalCustomers',
      label: 'totalCustomers',
      description: 'totalCustomersDescription',
      total: 342,
      chartData: [
        { date: 'Jan', value: 12 },
        { date: 'Feb', value: 18 },
        { date: 'Mar', value: 9 },
        { date: 'Apr', value: 24 },
        { date: 'May', value: 16 },
        { date: 'Jun', value: 27 },
      ],
    },
    {
      key: 'totalRevenue',
      label: 'totalRevenue',
      description: 'totalRevenueDescription',
      total: 24567,
      chartData: [
        { date: 'Jan', value: 12 },
        { date: 'Feb', value: 18 },
        { date: 'Mar', value: 9 },
        { date: 'Apr', value: 24 },
        { date: 'May', value: 16 },
        { date: 'Jun', value: 27 },
      ],
    },
    {
      key: 'totalOrders',
      label: 'totalOrders',
      description: 'totalOrdersDescription',
      total: 1240,
      chartData: [
        { date: 'Jan', value: 12 },
        { date: 'Feb', value: 18 },
        { date: 'Mar', value: 9 },
        { date: 'Apr', value: 24 },
        { date: 'May', value: 16 },
        { date: 'Jun', value: 27 },
      ],
    },
  ],

  periods: {
    7: [
      {
        key: 'newCustomers',
        label: 'newCustomers',
        description: 'newCustomersDescription',
        value: 3,
        goal: 5,
        changePercentage: 3,
      },
      {
        key: 'newRevenue',
        label: 'newRevenue',
        description: 'revenueDescription',
        value: 9000,
        goal: 10000,
        changePercentage: 5,
      },
      {
        key: 'newOrders',
        label: 'newOrders',
        description: 'newOrdersDescription',
        value: 8,
        goal: 10,
        changePercentage: -3,
      },
    ],

    30: [
      {
        key: 'newCustomers',
        label: 'newCustomers',
        description: 'newCustomersDescription',
        value: 18,
        goal: 20,
        changePercentage: 12,
      },
      {
        key: 'newRevenue',
        label: 'newRevenue',
        description: 'revenueDescription',
        value: 18000,
        goal: 20000,
        changePercentage: 8,
      },
      {
        key: 'newOrders',
        label: 'newOrders',
        description: 'newOrdersDescription',
        value: 36,
        goal: 40,
        changePercentage: 6,
      },
    ],

    365: [
      {
        key: 'newCustomers',
        label: 'newCustomers',
        description: 'newCustomersDescription',
        value: 190,
        goal: 200,
        changePercentage: 15,
      },
      {
        key: 'newRevenue',
        label: 'newRevenue',
        description: 'revenueDescription',
        value: 220000,
        goal: 240000,
        changePercentage: 10,
      },
      {
        key: 'newOrders',
        label: 'newOrders',
        description: 'newOrdersDescription',
        value: 470,
        goal: 500,
        changePercentage: -2,
      },
    ],
  },
};
