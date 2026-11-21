import SkeletonProgressBar from '../skeletonProgressBar/SkeletonProgressBar';
import SkeletonIcon from '../skeltonIcon/SkeletonIcon';
import SkeletonKpiCardText from './SkeletonKpiCardText';

const SkeletonPeriodKpiCard = () => (
  <div className="cart position-relative">
    <SkeletonIcon variant="round" />
    <div className="skeleton-kpi-cart">
      <SkeletonKpiCardText />
    </div>
    <SkeletonProgressBar />
  </div>
);

export default SkeletonPeriodKpiCard;
