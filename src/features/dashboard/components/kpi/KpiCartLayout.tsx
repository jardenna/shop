import Cart from '../../../../components/carts/Cart';
import type { IconNameValue } from '../../../../types/types';
import type { DashboardKpiId } from '../../dashboardUtils';
import { dashboardKpiVariants } from '../../dashboardUtils';
import KpiContent from './KpiContent';

interface KpiCartLayoutProps {
  children: React.ReactNode;
  description: string;
  iconName: IconNameValue;
  id: DashboardKpiId;
  kpiTotal: number | string;
  title: string;
  className?: string;
}

const KpiCartLayout = ({
  id,
  iconName,
  description,
  title,
  kpiTotal,
  children,
  className = '',
}: KpiCartLayoutProps) => (
  <Cart className={dashboardKpiVariants[id]}>
    <div className={`kpi-cart ${className}`}>
      <KpiContent
        iconName={iconName}
        description={description}
        title={title}
        kpiTotal={kpiTotal}
      />
      {children}
    </div>
  </Cart>
);

export default KpiCartLayout;
