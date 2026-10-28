export const data = {
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
      goal: 5,
      goalPercentage: 60,
      changePercentage: 3,
    },
    {
      key: 'newRevenue',
      title: 'newRevenue',
      description: 'revenueDescription',
      value: 9000,
      goal: 10000,
      goalPercentage: 90,
      changePercentage: 5,
    },
    {
      key: 'newOrders',
      title: 'newOrders',
      description: 'newOrdersDescription',
      value: 8,
      goal: 10,
      goalPercentage: 80,
      changePercentage: -3,
    },
  ],
};
