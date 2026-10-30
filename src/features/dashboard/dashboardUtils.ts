export const dashboardKpiVariants = {
  totalCustomers: 'total-customers',
  totalOrders: 'total-orders',
  totalRevenue: 'total-revenue',
  newCustomers: 'new-customers',
  orders: 'new-orders',
  revenue: 'new-revenue',
} as const;

export type DashboardKpiId = keyof typeof dashboardKpiVariants;
export type DashboardKpiVariant = (typeof dashboardKpiVariants)[DashboardKpiId];
