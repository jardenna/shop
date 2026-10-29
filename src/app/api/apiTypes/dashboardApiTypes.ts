import { ChartData } from '../../../types/types';
import { DashboardPeriod, GoalKeys } from './dashboardGoalsApiTypes';

export type TotalKpiKey = 'totalCustomers' | 'totalRevenue' | 'totalOrders';

export interface TotalKpi {
  chartData: ChartData[];
  description: string;
  key: TotalKpiKey;
  label: string;
  total: number;
}

export interface PeriodKpi {
  changePercentage: number;
  description: string;
  goal: number;
  key: GoalKeys;
  label: string;
  value: number;
}

export interface KpiResponse {
  periods: Record<DashboardPeriod, PeriodKpi[]>;
  totals: TotalKpi[];
}
