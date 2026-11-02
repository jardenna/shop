import Skeleton from '../Skeleton';

const SkeletonKpiCartText = () => (
  <>
    <Skeleton className="skeleton-icon" />
    <div className="card-text">
      <Skeleton height="0.875" width="8.75" />
      <Skeleton height="1.75" width="11.875" />
      <Skeleton height="0.875" width="16.25" />
    </div>
  </>
);

export default SkeletonKpiCartText;
