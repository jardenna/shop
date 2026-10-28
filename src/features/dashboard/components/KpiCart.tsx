import Cart from '../../../components/carts/Cart';
import Icon from '../../../components/icons/Icon';
import ProgressBar from '../../../components/progressbar/ProgressBar';
import { IconName } from '../../../types/enums';
import './_dashboard.scss';

interface KpiCartProps {
  iconName: IconName;
  title: string;
  progressPercentage?: number;
}

const KpiCart = ({ title, iconName, progressPercentage }: KpiCartProps) => (
  <Cart className="kpi-cart">
    <div className="test">
      <div className="kpi-icon">
        <Icon iconName={iconName} />
      </div>
      <section>
        <h2 className="kpi-title">{title}</h2>
        <div>
          <span>342</span>
          {/* <span> {`${progressPercentage ?? '4'}%`}</span> */}
        </div>
        <div>Registered customers </div>
      </section>
    </div>
    {progressPercentage && (
      <ProgressBar progressPercentage={progressPercentage} />
    )}
  </Cart>
);

export default KpiCart;
