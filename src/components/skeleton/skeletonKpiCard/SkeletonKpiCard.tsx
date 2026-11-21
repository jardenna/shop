import SkeletonIcon from '../skeltonIcon/SkeletonIcon';
import SkeletonKpiCardText from './SkeletonKpiCardText';

const SkeletonKpiCard = () => (
  <div className="card skeleton-kpi-card">
    <SkeletonKpiCardText />
    <SkeletonIcon />
  </div>
);

export default SkeletonKpiCard;
