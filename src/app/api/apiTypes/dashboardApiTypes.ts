import { ChartData } from '../../../types/types';
import { GoalKeys } from './dashboardGoalsApiTypes';

type TotalKpiKey = 'totalCustomers' | 'totalRevenue' | 'totalOrders';

export interface TotalKpiResponse {
  chartData: ChartData[];
  description: string;
  key: TotalKpiKey;
  label: string;
  total: number;
}

export interface PeriodKpiResponse {
  changePercentage: number;
  currentPeriod: {
    endDate: Date;
    startDate: Date;
  };
  description: string;
  goal: number;
  key: GoalKeys;
  label: string;
  previousPeriod: {
    endDate: Date;
    startDate: Date;
  };
  previousValue: number;
  value: number;
}
