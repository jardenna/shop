import Skeleton from '../../Skeleton';
import SkeletonBreadCrumbs from '../../SkeletonBreadCrumbs';
import SkeletonControlList from '../../SkeletonControlList';
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
    <div className="skeleton-price-row">
      <Skeleton width="10" height="3" />
    </div>
    <SkeletonRating />
    <SkeletonControlList count={5} variant="large" />
    <SkeletonControlList count={5} variant="medium" />
    qty
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
