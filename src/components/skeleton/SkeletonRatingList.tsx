import { SizeVariantNew } from '../../types/types';
import Skeleton, { SkeletonProps } from './Skeleton';

interface SkeletonRatingListProps extends SkeletonProps {
  variant?: SizeVariantNew;
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
