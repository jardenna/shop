import type { ProductLabelVariant } from '../productLists/ProductListItem';
import Skeleton from './Skeleton';

type SkeletonControlListProps = {
  count: number;
  variant: ProductLabelVariant;
  height?: string;
  width?: string;
};

const SkeletonControlList = ({ variant, count }: SkeletonControlListProps) => (
  <div className="skeleton-control-list">
    <Skeleton height="0.7" width="10" />
    <div className="skeleton-control-item">
      <Skeleton count={count} className={`${variant}-item`} variant="default" />
    </div>
  </div>
);

export default SkeletonControlList;
