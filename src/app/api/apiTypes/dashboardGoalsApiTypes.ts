export type GoalPeriod = 7 | 30 | 365;
type GoalPeriods = Record<GoalPeriod, number>;

export type GoalKeys = 'newCustomers' | 'revenue' | 'orders';

export interface DashboardGoals {
  newCustomers: GoalPeriods;
  orders: GoalPeriods;
  revenue: GoalPeriods;
}

export interface TableHeader {
  days: keyof GoalPeriods;
  id: string;
  label: string;
}

export interface DashboardGoalsResponse {
  goal: number;
  success: boolean;
}

export interface Kpi {
  description: string;
  key: GoalKeys;
  label: string;
}

export interface DashboardResponse {
  goals: DashboardGoals;
  kpis: Kpi[];
  tableHeaders: TableHeader[];
}

export interface DashboardGoalsRequest {
  goals: Record<string, Record<number, number>>;
}
