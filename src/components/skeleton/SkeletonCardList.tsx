import type { ReactNode } from 'react';
import type { SkeletonProps } from './Skeleton';
import SkeletonCard from './SkeletonCard';

type SkeletonCardListProps = SkeletonProps & {
  children?: ReactNode;
};

const SkeletonCardList = ({
  count = 5,
  children,
  className = '',
}: SkeletonCardListProps) => {
  const skeletons = Array.from({ length: count });
  return (
    <div className={`skeleton-card-list ${className}`}>
      {skeletons.map((_, index) =>
        children ? children : <SkeletonCard key={index} />,
      )}
    </div>
  );
};

export default SkeletonCardList;
