import Skeleton, { PickedSkeletonTypes } from '../Skeleton';

const SkeletonPriceCol = ({ count = 4 }: PickedSkeletonTypes) => {
  const skeletons = Array.from({ length: count });

  return (
    <div className="price-col">
      <div className="price-box">
        <Skeleton className="section-title skeleton" />

        {skeletons.map((_, index) => (
          <span className="price-line" key={index}>
            <Skeleton className="skeleton label-skeleton" />
            <Skeleton className="skeleton value-skeleton" />
          </span>
        ))}

        <span className="price-total">
          <Skeleton className="skeleton label-skeleton" />
          <Skeleton className="skeleton value-skeleton" />
        </span>
      </div>
    </div>
  );
};

export default SkeletonPriceCol;
