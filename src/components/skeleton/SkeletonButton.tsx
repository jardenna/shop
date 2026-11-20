import Skeleton, { type SkeletonProps } from './Skeleton';

const SkeletonButton = ({ width }: SkeletonProps) => (
  <Skeleton width={width} className="btn" />
);

export default SkeletonButton;
