import Cart from '../../../../components/carts/Cart';
import Icon from '../../../../components/icons/Icon';
import ProgressBar from '../../../../components/progressbar/ProgressBar';
import BarChartComp from '../../../../components/reCharts/BarChartComp';
import { IconName } from '../../../../types/enums';
import { ChartData } from '../../../../types/types';
import { useCurrency } from '../../../currency/useCurrency';
import { DashboardKpiId, dashboardKpiVariants } from '../../dashboardUtils';

interface KpiCartProps {
  description: string;
  iconName: IconName;
  id: DashboardKpiId;
  title: string;
  total: number;
  changePercentage?: number;
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
  const isRevenue = id.toLowerCase().includes('revenue');
  const { convertedPrice } = useCurrency(total);

  return (
    <Cart className={dashboardKpiVariants[id]}>
      <div className="kpi-content">
        <div className="kpi-cart">
          <div className="kpi-icon">
            <Icon iconName={iconName} />
          </div>
          <section>
            <h2 className="kpi-title">{title}</h2>
            <p>
              <span className="kpi-total">
                {isRevenue ? convertedPrice : total}
              </span>

              {changePercentage && (
                <span>
                  {changePercentage > 0 ? '↑' : '↓'} {changePercentage} %
                </span>
              )}
            </p>
            <p className="kpi-description">{description}</p>
          </section>
        </div>

        {chartData && <BarChartComp data={chartData} />}
        {progressPercentage && (
          <p>{Math.round(progressPercentage)} % of goals</p>
        )}
      </div>

      {progressPercentage && (
        <ProgressBar progressPercentage={progressPercentage} />
      )}
    </Cart>
  );
};
export default KpiCart;
