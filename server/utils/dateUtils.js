import { format, startOfMonth, subDays, subMonths } from 'date-fns';

export const getDayRange = (createdAt) => {
  const startDate = new Date(createdAt);
  const endDate = new Date(createdAt);

  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  return {
    $gte: startDate,
    $lte: endDate,
  };
};

export const getDashboardDayRange = (period) => {
  const endDate = new Date();
  const startDate = subDays(endDate, period);

  return {
    $gte: startDate,
    $lte: endDate,
  };
};

export const getMonthlyChartData = (items, getValue = () => 1) => {
  const currentMonth = startOfMonth(new Date());

  return Array.from({ length: 6 }, (_, index) => {
    const month = subMonths(currentMonth, 5 - index);

    const monthlyItems = items.filter(
      (item) => format(item.createdAt, 'yyyy-MM') === format(month, 'yyyy-MM'),
    );

    return {
      date: format(month, 'MMM'),
      value: monthlyItems.reduce((total, item) => total + getValue(item), 0),
    };
  });
};
