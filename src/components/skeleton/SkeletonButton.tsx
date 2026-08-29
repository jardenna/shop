import Skeleton, { SkeletonProps } from './Skeleton';

const SkeletonButton = ({ width }: SkeletonProps) => (
  <Skeleton height="3.75" width={width} className="skeleton-btn" />
);

export default SkeletonButton;
