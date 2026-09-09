import Skeleton from '../Skeleton';
import SkeletonAccordion from '../skeletonAccordion/SkeletonAccordion';
import SkeletonBreadCrumbs from '../SkeletonBreadCrumbs';
import SkeletonButton from '../SkeletonButton';
import SkeletonControlList from '../SkeletonControlList';
import SkeletonNumberStep from '../skeletonNumberStep/SkeletonNumberStep';
import SkeletonRatingList from '../SkeletonRatingList';
import SkeletonRating from './SkeletonRating';

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
    <SkeletonNumberStep />
    <SkeletonButton />
    <SkeletonAccordion />
  </div>
);

export default SkeletonSingleProductInfo;
