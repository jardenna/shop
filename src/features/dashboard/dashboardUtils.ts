export const dashboardKpiVariants = {
  totalCustomers: 'users',
  totalOrders: 'orders',
  totalRevenue: 'revenue',
  newCustomers: 'new-customers',
  orders: 'conversions',
  revenue: 'page-views',
} as const;

export type DashboardKpiId = keyof typeof dashboardKpiVariants;
export type DashboardKpiVariant = (typeof dashboardKpiVariants)[DashboardKpiId];
