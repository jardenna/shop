import Card from '../../../../components/carts/Card';
import type { IconNameValue } from '../../../../shared/types';
import type { DashboardKpiId } from '../../dashboardUtils';
import { dashboardKpiVariants } from '../../dashboardUtils';
import KpiContent from './KpiContent';

interface KpiCardLayoutProps {
  children: React.ReactNode;
  description: string;
  iconName: IconNameValue;
  id: DashboardKpiId;
  kpiTotal: number | string;
  title: string;
  className?: string;
}

const KpiCardLayout = ({
  id,
  iconName,
  description,
  title,
  kpiTotal,
  children,
  className = '',
}: KpiCardLayoutProps) => (
  <Card className={dashboardKpiVariants[id]}>
    <div className={`kpi-cart ${className}`}>
      <KpiContent
        iconName={iconName}
        description={description}
        title={title}
        kpiTotal={kpiTotal}
      />
      {children}
    </div>
  </Card>
);

export default KpiCardLayout;
