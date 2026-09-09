import Skeleton from '../Skeleton';
import SkeletonRatingList from '../SkeletonRatingList';

const SkeletonRating = () => (
  <div className="skeleton-rating-container">
    <Skeleton className="skeleton-rating-label" />
    <Skeleton className="skeleton-divider" />
    <SkeletonRatingList variant="medium" />
  </div>
);

export default SkeletonRating;
