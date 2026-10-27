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

export interface DashboardGoalsResponse {
  goal: number;
  success: boolean;
}

export interface Kpi {
  description: string;
  id: string;
  key: GoalKeys;
  label: GoalKeys;
}

export interface DashboardResponse {
  goals: DashboardGoals;
  kpis: Kpi[];
  tableHeaders: TableHeader[];
}
