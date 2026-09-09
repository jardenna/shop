import Skeleton from '../../Skeleton';
import SkeletonBreadCrumbs from '../../SkeletonBreadCrumbs';
import SkeletonRatingList from '../../SkeletonRatingList';
import SkeletonRating from '../SkeletonRating';
import './_skeleton-single-product-info.scss';

const SkeletonSingleProductInfo = () => (
  <div className="skeleton-single-product-container">
    <SkeletonBreadCrumbs width="12" />
    <div className="skeleton-title-row">
      <Skeleton className="skeleton-title" />
      <Skeleton className="skeleton-heart" />
    </div>
    <SkeletonRatingList />
    <div className="skeleton-count-in-stock">
      <Skeleton className="skeleton-count-in-stock-icon" />
      <Skeleton className="skeleton-count-in-stock-label" />
    </div>
    <div className="price-row">
      <div className="price-skeleton skeleton" />
    </div>
    <SkeletonRating />
    ???
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
