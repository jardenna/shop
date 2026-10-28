import Cart from '../../../components/carts/Cart';
import Icon from '../../../components/icons/Icon';
import ProgressBar from '../../../components/progressbar/ProgressBar';
import { IconName } from '../../../types/enums';
import './_dashboard.scss';

interface KpiCartProps {
  iconName: IconName;
  title: string;
}

const KpiCart = ({ title, iconName }: KpiCartProps) => (
  <Cart className="kpi-cart">
    <Icon iconName={iconName} />
    <section>
      <h2>{title}</h2>
      <div>
        <span> + 3%</span>
      </div>
      <div>3 new this week</div>
      <ProgressBar progressPercentage={20} />
    </section>
  </Cart>
);

export default KpiCart;
