import Skeleton from '../Skeleton';

const SkeletonToolbar = () => (
  <div className="skeleton-toolbar">
    <div className="view-toggle">
      <Skeleton />
      <Skeleton />
    </div>

    <Skeleton className="results-label" />
    <Skeleton className="filter-btn" />
  </div>
);

export default SkeletonToolbar;
