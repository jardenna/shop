import Cart from '../../../../components/carts/Cart';
import ProgressBar from '../../../../components/progressbar/ProgressBar';
import BarChartComp from '../../../../components/reCharts/BarChartComp';
import { IconName } from '../../../../types/enums';
import { ChartData } from '../../../../types/types';
import { useCurrency } from '../../../currency/useCurrency';
import { useLanguage } from '../../../language/useLanguage';
import { DashboardKpiId, dashboardKpiVariants } from '../../dashboardUtils';
import KpiContent from './KpiContent';

export interface BaseKpiCartProps {
  description: string;
  iconName: IconName;
  title: string;
  changePercentage?: number;
}

interface KpiCartProps extends BaseKpiCartProps {
  id: DashboardKpiId;
  total: number;
  chartData?: ChartData[];
  progressPercentage?: number;
}

const KpiCart = ({
  title,
  iconName,
  progressPercentage,
  changePercentage,
  description,
  total,
  id,
  chartData,
}: KpiCartProps) => {
  const { language } = useLanguage();
  const isRevenue = id.toLowerCase().includes('revenue');
  const { convertedPrice } = useCurrency(total);

  return (
    <Cart className={dashboardKpiVariants[id]}>
      <div className="kpi-cart">
        <KpiContent
          iconName={iconName}
          description={description}
          title={title}
          kpiTotal={isRevenue ? convertedPrice : total}
          changePercentage={changePercentage}
        />

        {chartData && <BarChartComp data={chartData} />}
      </div>
      {progressPercentage && (
        <div className="kpi-progress-bar">
          <span className="kpi-progress-info">
            <span>{language.goalProgress}</span>
            <span>{Math.round(progressPercentage)} % </span>
          </span>
          <ProgressBar progressPercentage={progressPercentage} />
        </div>
      )}
    </Cart>
  );
};

export default KpiCart;
