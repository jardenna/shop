import Skeleton from './Skeleton';

const SkeletonHeader = () => (
  <div className="skeleton-header">
    <Skeleton width="16" height="3" />
    <Skeleton width="12" height="1" />
  </div>
);

export default SkeletonHeader;
