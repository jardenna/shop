import BarChartComp from '../../../../components/reCharts/BarChartComp';
import { IconName } from '../../../../types/enums';
import { ChartData } from '../../../../types/types';
import { useCurrency } from '../../../currency/useCurrency';
import { DashboardKpiId } from '../../dashboardUtils';
import KpiCartLayout from './KpiCartLayout';

export interface BaseKpiCartProps {
  description: string;
  iconName: IconName;
  title: string;
}

interface KpiCartProps extends BaseKpiCartProps {
  chartData: ChartData[];
  id: DashboardKpiId;
  total: number;
}

const KpiCart = ({
  title,
  iconName,

  description,
  total,
  id,
  chartData,
}: KpiCartProps) => {
  const isRevenue = id.toLowerCase().includes('revenue');
  const { convertedPrice } = useCurrency(total);

  return (
    <KpiCartLayout
      iconName={iconName}
      description={description}
      title={title}
      kpiTotal={isRevenue ? convertedPrice : total}
      id={id}
    >
      <BarChartComp data={chartData} />
    </KpiCartLayout>
  );
};

export default KpiCart;
