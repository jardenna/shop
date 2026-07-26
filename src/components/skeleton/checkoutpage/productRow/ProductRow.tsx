import Skeleton from '../../Skeleton';
import SkeletonHeading from '../../SkeletonHeading';
import './_product-row.scss';

const ProductRow = () => (
  <span>
    <SkeletonHeading />
    <span className="skeleton-product-row">
      <Skeleton className="product-thumb" />
      <span className="product-info">
        <Skeleton className="product-title" height="1" />
        <Skeleton className="product-meta" height="1" />
      </span>
    </span>
  </span>
);

export default ProductRow;
