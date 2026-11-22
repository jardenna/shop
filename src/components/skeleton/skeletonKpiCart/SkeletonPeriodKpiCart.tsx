import SkeletonProgressBar from '../skeletonProgressBar/SkeletonProgressBar';
import SkeletonIcon from '../skeltonIcon/SkeletonIcon';
import SkeletonKpiCartText from './SkeletonKpiCartText';

const SkeletonPeriodKpiCart = () => (
  <div className="cart position-relative">
    <SkeletonIcon variant="round" />
    <div className="skeleton-kpi-cart">
      <SkeletonKpiCartText />
    </div>
    <SkeletonProgressBar />
  </div>
);

export default SkeletonPeriodKpiCart;
