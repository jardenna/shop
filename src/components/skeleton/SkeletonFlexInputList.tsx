import type { PickedSkeletonTypes } from './Skeleton';
import SkeletonInput from './SkeletonInput';

const SkeletonFlexInputList = ({ count = 2 }: PickedSkeletonTypes) => {
  const skeletons = Array.from({ length: count });
  return (
    <span className="skeleton-input-container skeleton-flex-input-list">
      {skeletons.map((_, index) => (
        <SkeletonInput key={index} />
      ))}
    </span>
  );
};

export default SkeletonFlexInputList;
