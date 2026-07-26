import Skeleton, { SkeletonProps } from './Skeleton';

const SkeletonNavItem = ({ width, className = '' }: SkeletonProps) => (
  <div className={`skeleton-nav-item ${className}`}>
    <Skeleton className="nav-icon" />
    <Skeleton className="nav-label" width={width} />
  </div>
);

export default SkeletonNavItem;
