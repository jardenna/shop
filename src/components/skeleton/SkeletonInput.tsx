import Skeleton, { SkeletonProps } from './Skeleton';

const SkeletonInput = ({ count = 3, className = '' }: SkeletonProps) => {
  const skeletons = Array.from({ length: count });
  return (
    <span className={`skeleton-input-container ${className}`}>
      {skeletons.map((_, index) => (
        <div key={index} className="skeleton-input">
          <Skeleton height="1.3" width="14" />
          <Skeleton height="4" />
        </div>
      ))}
    </span>
  );
};

export default SkeletonInput;
