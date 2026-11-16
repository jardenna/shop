import Skeleton from '../Skeleton';

const SkeletonRatingRow = () => (
  <div className="skeleton-rating-row">
    <Skeleton className="skeleton-rating-row-label" />
    <div className="row-bar skeleton" style={{ width: '100%' }} />
    <Skeleton className="skeleton-rating-row-count " />
  </div>
);

export default SkeletonRatingRow;
