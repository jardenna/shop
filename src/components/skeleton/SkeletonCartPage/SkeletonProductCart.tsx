const SkeletonProductCart = () => (
  <div className="product-card">
    <div className="product-thumb skeleton" />
    <div className="product-body">
      <div className="top-row">
        <div className="title-skeleton skeleton" />
        <div className="price-skeleton skeleton" />
      </div>

      <div className="meta-lines">
        <div className="skeleton meta-color" />
        <div className="skeleton meta-size" />
      </div>

      <div className="bottom-row">
        <div className="qty-selector">
          <div className="skeleton" />
          <div className="skeleton qty-value" />
          <div className="skeleton" />
        </div>

        <div className="action-icons">
          <div className="skeleton" />
          <div className="skeleton" />
        </div>
      </div>
    </div>
    <hr className="divider" />
  </div>
);

export default SkeletonProductCart;
