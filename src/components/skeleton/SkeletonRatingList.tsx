import Skeleton, { SkeletonProps } from './Skeleton';

const SkeletonRatingList = ({ count = 5 }: SkeletonProps) => (
  <div>
    {Array.from({ length: count }).map((_, index) => (
      <div className="skeleton-accordion-item" key={index}>
        <Skeleton className="skeleton-accordion-title" />
      </div>
    ))}
  </div>
);

export default SkeletonRatingList;
