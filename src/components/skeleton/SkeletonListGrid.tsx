import Skeleton, { SkeletonProps } from './Skeleton';

const SkeletonListGrid = ({ count = 5 }: SkeletonProps) => {
  const skeletons = Array.from({ length: count });
  return (
    <div className="flex column">
      {skeletons.map((_, index) => (
        <div key={index} className="grid two-col">
          <Skeleton height="1" width="5" />
          <Skeleton height="1" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonListGrid;
