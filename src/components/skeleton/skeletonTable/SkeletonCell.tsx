import Skeleton, { SkeletonProps } from '../Skeleton';
import './_skeleton-table.scss';

const SkeletonCell = ({ count = 8, height = '1.4' }: SkeletonProps) => {
  const skeletons = Array.from({ length: count });
  return (
    <>
      {skeletons.map((_, index) => (
        <Skeleton className="skeleton-cell" key={index} height={height} />
      ))}
    </>
  );
};

export default SkeletonCell;
