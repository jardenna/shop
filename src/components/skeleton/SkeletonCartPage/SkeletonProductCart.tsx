import Skeleton from '../Skeleton';

const SkeletonProductCart = () => (
  <span className="skeleton-product-cart">
    <Skeleton className="product-thumb" />
    <span className="product-body">
      <span className="top-row">
        <Skeleton className="title-skeleton" />
        <Skeleton className="price-skeleton" />
      </span>

      <span className="meta-lines">
        <Skeleton className="meta-color" />
        <Skeleton className="meta-size" />
      </span>

      <span className="product-cart-bottom-row">
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
  </span>
);

export default SkeletonProductCart;
