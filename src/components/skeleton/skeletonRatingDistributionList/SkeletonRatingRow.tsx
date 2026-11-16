import Skeleton from '../Skeleton';

const SkeletonRatingRow = ({ width }: { width: number }) => (
  <div className="skeleton-rating-row">
    <Skeleton className="skeleton-rating-row-label" />
    <div
      className="skeleton-rating-bar skeleton"
      style={{ width: `${width}%` }}
    />
    <Skeleton className="skeleton-rating-row-count " />
  </div>
);

export default SkeletonRatingRow;
