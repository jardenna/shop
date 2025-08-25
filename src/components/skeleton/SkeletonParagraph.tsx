import type { PickedSkeletonTypes } from './Skeleton';
import SkeletonList from './SkeletonList';

const SkeletonParagraph = ({
  count = 3,
  height = '0.8',
  width = '',
}: PickedSkeletonTypes) => (
  <SkeletonList
    className="skeleton-paragraph skeleton-column"
    height={height}
    count={count}
    width={width}
  />
);

export default SkeletonParagraph;
