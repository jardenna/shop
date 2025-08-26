import type { ProductLabelVariant } from '../productLists/ProductListItem';
import Skeleton from './Skeleton';
import SkeletonParagraph from './SkeletonParagraph';

type SkeletonControlListProps = {
  count: number;
  height?: string;
  variant?: ProductLabelVariant;
  width?: string;
};

const SkeletonControlList = ({
  variant = 'medium',
  count,
}: SkeletonControlListProps) => (
  <div className="skeleton-control-list">
    <SkeletonParagraph width="5" count={1} />
    <div className="skeleton-control-item">
      <Skeleton count={count} className={`${variant}-item`} variant="default" />
    </div>
  </div>
);

export default SkeletonControlList;
