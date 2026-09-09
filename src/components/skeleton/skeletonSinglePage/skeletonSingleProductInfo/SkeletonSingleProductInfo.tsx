import SkeletonRatingList from '../../SkeletonRatingList';
import './_skeleton-single-product-info.scss';

const SkeletonSingleProductInfo = () => (
  <div className="product-panel">
    <div className="title-row">
      <div className="title-skeleton skeleton" />
      <div className="heart-skeleton skeleton" />
    </div>
    <SkeletonRatingList />

    <div className="stock-row">
      <div className="stock-icon skeleton" />
      <div className="stock-label skeleton" />
    </div>

    <div className="price-row">
      <div className="price-skeleton skeleton" />
    </div>

    <div className="section-label skeleton" />
    <hr className="divider" />
    <SkeletonRatingList variant="medium" />

    <div className="swatch-label skeleton" />
    <div className="swatches">
      <div className="swatch skeleton" />
      <div className="swatch skeleton" />
    </div>

    <div className="size-label skeleton" />
    <div className="size-option skeleton" />

    <div className="qty-row">
      <div className="qty-title skeleton" />
      <div className="qty-selector">
        <div className="skeleton" />
        <div className="qty-value skeleton" />
        <div className="skeleton" />
      </div>
    </div>

    <div className="add-to-cart skeleton" />
  </div>
);

export default SkeletonSingleProductInfo;
