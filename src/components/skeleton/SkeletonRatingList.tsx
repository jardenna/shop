import type { SizeVariant } from '../../shared/types';
import Skeleton, { type SkeletonProps } from './Skeleton';

interface SkeletonRatingListProps extends SkeletonProps {
  variant?: SizeVariant;
}

const SkeletonRatingList = ({
  count = 5,
  variant = 'small',
}: SkeletonRatingListProps) => (
  <div className="skeleton-rating">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index}>
        <Skeleton className={`skeleton-star ${variant}`} />
      </div>
    ))}
  </div>
);

export default SkeletonRatingList;
