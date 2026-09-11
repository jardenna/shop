import Skeleton, { SkeletonProps } from './Skeleton';

const SkeletonInput = ({ className = '' }: SkeletonProps) => (
  <div className={`skeleton-input skeleton-column ${className}`}>
    <Skeleton height="1" width="14" />
    <Skeleton height="4" />
  </div>
);

export default SkeletonInput;
