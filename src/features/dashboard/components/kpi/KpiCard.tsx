import BarChartComp from '../../../../components/reCharts/BarChartComp';
import type { ChartData, IconNameValue } from '../../../../shared/types';
import { useCurrency } from '../../../currency/useCurrency';
import type { DashboardKpiId } from '../../dashboardUtils';
import KpiCardLayout from './KpiCardLayout';

export interface BaseKpiCardProps {
  description: string;
  iconName: IconNameValue;
  title: string;
}

interface KpiCardProps extends BaseKpiCardProps {
  chartData: ChartData[];
  id: DashboardKpiId;
  total: number;
}

const KpiCard = ({
  title,
  iconName,
  description,
  total,
  id,
  chartData,
}: KpiCardProps) => {
  const isRevenue = id.toLowerCase().includes('revenue');
  const { convertedPrice } = useCurrency(total);

  return (
    <KpiCardLayout
      iconName={iconName}
      description={description}
      title={title}
      kpiTotal={isRevenue ? convertedPrice : total}
      id={id}
    >
      <BarChartComp data={chartData} />
    </KpiCardLayout>
  );
};

export default KpiCard;
