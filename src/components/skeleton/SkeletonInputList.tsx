import type { PickedSkeletonTypes } from './Skeleton';
import SkeletonInput from './SkeletonInput';

const SkeletonInputList = ({ count = 3 }: PickedSkeletonTypes) => {
  const skeletons = Array.from({ length: count });
  return (
    <span className="skeleton-input-container skeleton-column">
      {skeletons.map((_, index) => (
        <SkeletonInput key={index} />
      ))}
    </span>
  );
};

export default SkeletonInputList;
