import Skeleton, { SkeletonProps } from './Skeleton';

const SkeletonList = ({
  count = 2,
  width,
  height,
  className = '',
  variant,
}: SkeletonProps) => {
  const skeletons = Array.from({ length: count });
  return (
    <span className={`skeleton-list ${className}`}>
      {skeletons.map((_, index) => (
        <Skeleton key={index} height={height} width={width} variant={variant} />
      ))}
    </span>
  );
};

export default SkeletonList;
