import Skeleton, { SkeletonProps } from './Skeleton';

const SkeletonBadge = ({
  count = 1,
  width,
  height = '1',
  className = '',
  variant,
}: SkeletonProps) => {
  const skeletons = Array.from({ length: count });
  return (
    <span className={`skeleton-badge ${className}`}>
      {skeletons.map((_, index) => (
        <Skeleton key={index} height={height} width={width} variant={variant} />
      ))}
    </span>
  );
};

export default SkeletonBadge;
