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
  description: string;
  goal: number;
  key: GoalKeys;
  label: string;
  value: number;
}
