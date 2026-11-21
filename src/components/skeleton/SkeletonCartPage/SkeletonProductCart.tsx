import Skeleton from '../Skeleton';

const SkeletonProductCart = () => (
  <div className="skeleton-product-card">
    <Skeleton className="product-thumb" />
    <span className="skeleton-product-card-content">
      <span className="top-row">
        <Skeleton className="title-skeleton" />
        <Skeleton className="price-skeleton" />
      </span>

      <span className="meta-lines">
        <Skeleton className="meta-color" />
        <Skeleton className="meta-size" />
      </span>

      <span className="product-card-bottom-row">
        <span className="qty-selector">
          <Skeleton />
          <Skeleton className=" qty-value" />
          <Skeleton />
        </span>

        <div className="action-icons">
          <Skeleton />
          <Skeleton />
        </div>
      </span>
    </span>
  </div>
);

export default SkeletonProductCart;
