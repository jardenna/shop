import type { SizeVariant } from '../../types/types';
import Skeleton, { type SkeletonProps } from './Skeleton';
import SkeletonParagraph from './SkeletonParagraph';

interface SkeletonControlListProps extends SkeletonProps {
  variant?: SizeVariant;
}

const SkeletonControlList = ({
  count,
  variant = 'small',
}: SkeletonControlListProps) => (
  <div className="skeleton-control-list">
    <SkeletonParagraph width="5" count={1} />
    <div className="skeleton-control-item">
      <Skeleton count={count} className={`${variant}-item`} />
    </div>
  </div>
);

export default SkeletonControlList;
