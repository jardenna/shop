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

export interface DashboardGoalsResponse {
  goals: DashboardGoals;
}

export type GoalKeys = 'newCustomers' | 'orders' | 'revenue';

export interface DashboardGoalsRequest {
  days: number;
  goal: number;
  key: GoalKeys;
}
