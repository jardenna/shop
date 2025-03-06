import { FC } from 'react';
import Skeleton, { SkeletonProps } from './Skeleton';

const SkeletonList: FC<SkeletonProps> = ({
  count = 2,
  width,
  height,
  className = '',
  variant,
}) => {
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
