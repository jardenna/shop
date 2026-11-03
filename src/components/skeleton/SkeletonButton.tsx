import Skeleton, { SkeletonProps } from './Skeleton';

const SkeletonButton = ({ width }: SkeletonProps) => (
  <Skeleton width={width} className="btn" />
);

export default SkeletonButton;
