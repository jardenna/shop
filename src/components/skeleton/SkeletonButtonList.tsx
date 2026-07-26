import { SkeletonProps } from './Skeleton';
import SkeletonButton from './SkeletonButton';

const SkeletonButtonList = ({ count = 2 }: SkeletonProps) => {
  const skeletons = Array.from({ length: count });
  return (
    <span className="skeleton-list">
      {skeletons.map((_, index) => (
        <SkeletonButton key={index} />
      ))}
    </span>
  );
};

export default SkeletonButtonList;
