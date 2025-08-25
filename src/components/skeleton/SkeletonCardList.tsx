import { SkeletonProps } from './Skeleton';
import SkeletonCard from './SkeletonCard';

const SkeletonCardList = ({ count = 5 }: SkeletonProps) => {
  const skeletons = Array.from({ length: count });
  return (
    <div className="skeleton-card-list">
      {skeletons.map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default SkeletonCardList;
