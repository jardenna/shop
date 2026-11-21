import SkeletonProgressBar from '../skeletonProgressBar/SkeletonProgressBar';
import SkeletonIcon from '../skeltonIcon/SkeletonIcon';
import SkeletonKpiCardText from './SkeletonKpiCardText';

const SkeletonPeriodKpiCard = () => (
  <div className="card position-relative">
    <SkeletonIcon variant="round" />
    <div className="skeleton-kpi-card">
      <SkeletonKpiCardText />
    </div>
    <SkeletonProgressBar />
  </div>
);

export default SkeletonPeriodKpiCard;
