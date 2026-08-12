import type { ReactNode } from 'react';
import type { SkeletonProps } from '../Skeleton';
import SkeletonCart from '../SkeletonCart';
import './_skeleton-cart-list.scss';

type SkeletonCartListProps = SkeletonProps & {
  children?: ReactNode;
};

const SkeletonCartList = ({
  count = 5,
  children,
  className = '',
}: SkeletonCartListProps) => {
  const skeletons = Array.from({ length: count });
  return (
    <div className={`skeleton-cart-list ${className}`}>
      {skeletons.map((_, index) =>
        children ? children : <SkeletonCart key={index} />,
      )}
    </div>
  );
};

export default SkeletonCartList;
