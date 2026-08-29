import Skeleton, { SkeletonProps } from './Skeleton';

const SkeletonHeading = ({ width = '12' }: SkeletonProps) => (
  <Skeleton height="1.5" width={width} className="skeleton-heading" />
);

export default SkeletonHeading;
