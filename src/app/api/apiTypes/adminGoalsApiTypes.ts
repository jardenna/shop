import { DefaultResponse } from './sharedApiTypes';

export type GoalPeriod = 7 | 30 | 365;
type GoalPeriods = Record<GoalPeriod, number>;

export type GoalKeys = 'newCustomers' | 'revenue' | 'orders';

interface AdminGoals {
  newCustomers: GoalPeriods;
  orders: GoalPeriods;
  revenue: GoalPeriods;
}

export interface TableHeader {
  days: keyof GoalPeriods;
  id: string;
  label: string;
}

export interface AdminGoalsResponse extends DefaultResponse {
  goal: number;
  success: boolean;
}

export interface Kpi {
  description: string;
  key: GoalKeys;
  label: string;
}

export interface AdminGoalsTableResponse {
  goals: AdminGoals;
  kpis: Kpi[];
  tableHeaders: TableHeader[];
}

export interface AdminGoalsRequest {
  goals: Record<string, Record<number, number>>;
}
