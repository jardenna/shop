import Skeleton, { SkeletonProps } from './Skeleton';

const SkeletonParagraph = ({
  count = 3,
  width = '100%',
  height = '1',
  className = '',
  variant,
}: SkeletonProps) => {
  const skeletons = Array.from({ length: count });
  return (
    <span className={`skeleton-paragraph ${className}`}>
      {skeletons.map((_, index) => (
        <Skeleton key={index} height={height} width={width} variant={variant} />
      ))}
    </span>
  );
};

export default SkeletonParagraph;
