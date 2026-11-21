import Skeleton from '../Skeleton';
import SkeletonIcon from '../skeltonIcon/SkeletonIcon';

const SkeletonKpiCardText = () => (
  <>
    <SkeletonIcon />
    <div className="skeleton-kpi-content">
      <Skeleton className="skeleton-kpi-label" />
      <Skeleton className="skeleton-kpi-value" />
      <Skeleton className="skeleton-kpi-sub" />
    </div>
  </>
);

export default SkeletonKpiCardText;
