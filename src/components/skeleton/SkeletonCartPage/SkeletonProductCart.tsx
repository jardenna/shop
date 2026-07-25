import Skeleton from '../Skeleton';

const SkeletonProductCart = () => (
  <div className="product-card">
    <Skeleton className="product-thumb" />
    <div className="product-body">
      <div className="top-row">
        <Skeleton className="title-skeleton" />
        <Skeleton className="price-skeleton" />
      </div>

      <div className="meta-lines">
        <Skeleton className="meta-color" />
        <Skeleton className="meta-size" />
      </div>

      <div className="bottom-row">
        <div className="qty-selector">
          <Skeleton />
          <Skeleton className=" qty-value" />
          <Skeleton />
        </div>

        <div className="action-icons">
          <Skeleton />
          <Skeleton />
        </div>
      </div>
    </div>
  </div>
);

export default SkeletonProductCart;
