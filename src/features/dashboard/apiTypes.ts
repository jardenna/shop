import { ChartData } from '../../types/types';

export type DashboardPeriod = 7 | 30 | 365;

export type TotalKpiKey = 'totalCustomers' | 'totalRevenue' | 'totalOrders';

export type PeriodKpiKey = 'newCustomers' | 'newRevenue' | 'newOrders';

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
  key: PeriodKpiKey;
  label: string;
  value: number;
}

export interface KpiResponse {
  periods: Record<DashboardPeriod, PeriodKpi[]>;
  totals: TotalKpi[];
}
