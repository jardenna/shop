import Skeleton from './Skeleton';

const SkeletonToggleButton = () => (
  <div className="skeleton-toggle-switch">
    <Skeleton className="skeleton-toggle-btn" />
    <Skeleton width="3" height="1" />
  </div>
);

export default SkeletonToggleButton;
