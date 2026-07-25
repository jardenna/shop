import Skeleton from '../../Skeleton';
import SkeletonHeading from '../../SkeletonHeading';
import './_product-row.scss';

const ProductRow = () => (
  <span>
    <SkeletonHeading />
    <span className="product-row">
      <Skeleton className="product-thumb" />
      <span className="product-info">
        <Skeleton className="product-title" />
        <Skeleton className="product-meta" />
      </span>
    </span>
  </span>
);

export default ProductRow;
