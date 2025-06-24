import type { SkeletonProps } from './Skeleton';
import SkeletonList from './SkeletonList';

const SkeletonBadge = ({
  count = 1,
  height = '1.5',
  width = '6',
}: SkeletonProps) => (
  <SkeletonList
    className="skeleton-badge"
    height={height}
    width={width}
    count={count}
  />
);

export default SkeletonBadge;
