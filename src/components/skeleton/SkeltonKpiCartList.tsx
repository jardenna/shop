import Skeleton, { SkeletonProps } from './Skeleton';

const SkeltonKpiCartList = ({
  count = 3,
  width,
  height = '3.5',
  className = '',
}: SkeletonProps) => {
  const skeletons = Array.from({ length: count });
  return (
    <span className={`skeleton-list ${className}`}>
      {skeletons.map((_, index) => (
        <Skeleton key={index} height={height} width={width} />
      ))}
    </span>
  );
};

export default SkeltonKpiCartList;
