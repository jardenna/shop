import { subDays } from 'date-fns';

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
