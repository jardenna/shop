import Cart from '../../../components/carts/Cart';
import Icon from '../../../components/icons/Icon';
import ProgressBar from '../../../components/progressbar/ProgressBar';
import BarChartComp from '../../../components/reCharts/BarChartComp';
import { IconName } from '../../../types/enums';
import { ChartData } from '../../../types/types';
import './_dashboard.scss';

interface KpiCartProps {
  description: string;
  iconName: IconName;
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
  chartData,
}: KpiCartProps) => (
  <Cart className="kpi-cart">
    <div className="test">
      <div className="kpi-icon">
        <Icon iconName={iconName} />
      </div>
      <section>
        <h2 className="kpi-title">{title}</h2>
        <div>
          <span>{total}</span>
          {changePercentage && (
            <span>
              {changePercentage > 0 ? '↑' : '↓'} {changePercentage} %
            </span>
          )}
        </div>
        <div>{description}</div>

        {progressPercentage && (
          <div>{Math.round(progressPercentage)} % of goals</div>
        )}
      </section>
    </div>
    {progressPercentage && (
      <ProgressBar progressPercentage={progressPercentage} />
    )}
    {chartData && <BarChartComp data={chartData} />}
  </Cart>
);

export default KpiCart;
