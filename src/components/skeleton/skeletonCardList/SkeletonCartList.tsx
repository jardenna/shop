import type { ReactNode } from 'react';
import type { SkeletonProps } from '../Skeleton';
import SkeletonCart from '../SkeletonCart';
import './_skeleton-cart-list.scss';

type SkeletonCardListProps = SkeletonProps & {
  children?: ReactNode;
};

const SkeletonCartList = ({
  count = 5,
  children,
  className = '',
}: SkeletonCardListProps) => {
  const skeletons = Array.from({ length: count });
  return (
    <div className={`skeleton-card-list ${className}`}>
      {skeletons.map((_, index) =>
        children ? children : <SkeletonCart key={index} />,
      )}
    </div>
  );
};

export default SkeletonCartList;
