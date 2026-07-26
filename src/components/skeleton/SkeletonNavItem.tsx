import Skeleton, { SkeletonProps } from './Skeleton';

const SkeletonNavItem = ({ width, className = '' }: SkeletonProps) => (
  <div className={`nav-item ${className}`}>
    <Skeleton className="nav-icon" />
    <Skeleton className="nav-label" width={width} />
  </div>
);

export default SkeletonNavItem;
