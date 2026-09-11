import { SkeletonProps } from './Skeleton';
import SkeletonInput from './SkeletonInput';

const SkeletonFlexInputList = ({
  count = 2,
  className = '',
}: SkeletonProps) => {
  const skeletons = Array.from({ length: count });
  return (
    <span className={`skeleton-input-container ${className}`}>
      {skeletons.map((_, index) => (
        <SkeletonInput key={index} />
      ))}
    </span>
  );
};

export default SkeletonFlexInputList;
