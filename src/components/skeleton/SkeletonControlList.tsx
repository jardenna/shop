import Skeleton, { SkeletonProps } from './Skeleton';
import SkeletonParagraph from './SkeletonParagraph';

const SkeletonControlList = ({
  count,
  className = 'small-item',
}: SkeletonProps) => (
  <div className="skeleton-control-list">
    <SkeletonParagraph width="5" count={1} />
    <div className="skeleton-control-item">
      <Skeleton count={count} className={className} />
    </div>
  </div>
);

export default SkeletonControlList;
