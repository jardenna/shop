import SkeletonIcon from '../skeltonIcon/SkeletonIcon';
import SkeletonKpiCardText from './SkeletonKpiCardText';

const SkeletonKpiCard = () => (
  <div className="cart skeleton-kpi-cart">
    <SkeletonKpiCardText />
    <SkeletonIcon />
  </div>
);

export default SkeletonKpiCard;
