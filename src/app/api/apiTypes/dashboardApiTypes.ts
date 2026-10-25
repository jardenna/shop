export interface GoalPeriods {
  30: number;
  365: number;
  7: number;
}

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

export type GoalKeys = 'newCustomers' | 'orders' | 'revenue';

export interface DashboardGoalsRequest {
  days: number;
  goal: number;
  key: GoalKeys;
}

export interface Kpi {
  description: string;
  id: string;
  key: GoalKeys;
  label: GoalKeys;
}

export interface DashboardGoalsResponse {
  goals: DashboardGoals;
  kpis: Kpi[];
  tableHeaders: TableHeader[];
}
