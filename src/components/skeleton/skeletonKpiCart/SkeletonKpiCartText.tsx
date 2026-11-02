import Skeleton from '../Skeleton';

const SkeletonKpiCartText = () => (
  <>
    <Skeleton className="skeleton-icon" />
    <div className="card-text">
      <Skeleton className="card-label" />
      <Skeleton className="card-value" />
      <Skeleton className="card-sub" />
    </div>
  </>
);

export default SkeletonKpiCartText;
