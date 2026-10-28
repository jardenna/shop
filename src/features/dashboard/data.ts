export const data = {
  period: 7,
  kpis: [
    {
      key: 'newCustomers',
      title: 'newCustomers',
      value: 3,
      goal: 5,
      goalPercentage: 60,
      changePercentage: 3,
      chartData: [
        { date: '2026-10-22', current: 2, previous: 1 },
        { date: '2026-10-23', current: 1, previous: 2 },
      ],
    },
    {
      key: 'revenue',
      title: 'revenue',
      value: 9000,
      goal: 10000,
      goalPercentage: 90,
      changePercentage: 5,
      chartData: [],
    },
    {
      key: 'newOrders',
      title: 'newOrders',
      value: 8,
      goal: 10,
      goalPercentage: 80,
      changePercentage: -3,
      chartData: [],
    },
  ],
};
