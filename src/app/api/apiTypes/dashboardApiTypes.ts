export interface GoalPeriods {
  30: number;
  365: number;
  7: number;
}

export interface DashboardGoalsResponse {
  newCustomers: GoalPeriods;
  orders: GoalPeriods;
  revenue: GoalPeriods;
}

export type GoalKeys = 'newCustomers' | 'orders' | 'revenue';

export interface DashboardGoalsRequest {
  days: number;
  goal: number;
  key: GoalKeys;
}
