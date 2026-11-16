import Skeleton from '../Skeleton';
import SkeletonDivider from '../SkeletonDivider';
import SkeletonRatingList from '../SkeletonRatingList';

const SkeletonRating = () => (
  <div className="skeleton-rating-container">
    <Skeleton className="skeleton-rating-label" />
    <SkeletonDivider />
    <SkeletonRatingList variant="medium" />
  </div>
);

export default SkeletonRating;
