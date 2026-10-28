import Cart from '../../../components/carts/Cart';
import Icon from '../../../components/icons/Icon';
import ProgressBar from '../../../components/progressbar/ProgressBar';
import { IconName } from '../../../types/enums';
import './_dashboard.scss';

interface KpiCartProps {
  iconName: IconName;
  title: string;
  isGoalKpi?: boolean;
}

const KpiCart = ({ title, iconName, isGoalKpi }: KpiCartProps) => (
  <Cart className="kpi-cart">
    <div className="test">
      <div className="kpi-icon">
        <Icon iconName={iconName} />
      </div>
      <section>
        <h2 className="kpi-title">{title}</h2>
        <div>
          <span>342</span>
          <span> + 3%</span>
        </div>
        <div>3 new this week</div>
      </section>
    </div>
    {isGoalKpi && <ProgressBar progressPercentage={60} />}
  </Cart>
);

export default KpiCart;
