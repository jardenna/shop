import Skeleton from '../Skeleton';

const SkeletonKpiCartText = () => (
  <>
    <Skeleton className="skeleton-icon" />
    <div className="skeleton-kpi-content">
      <Skeleton className="skeleton-kpi-label" />
      <Skeleton className="skeleton-kpi-value" />
      <Skeleton className="skeleton-kpi-sub" />
    </div>
  </>
);

export default SkeletonKpiCartText;
