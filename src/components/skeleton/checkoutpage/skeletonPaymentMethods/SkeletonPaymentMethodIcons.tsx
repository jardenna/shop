import Skeleton, { PickedSkeletonTypes } from '../../Skeleton';

const SkeletonPaymentMethodIcons = ({ count = 4 }: PickedSkeletonTypes) => {
  const skeletons = Array.from({ length: count });
  return (
    <span className="card-icons">
      {skeletons.map((_, index) => (
        <span key={index}>
          <Skeleton />
        </span>
      ))}
    </span>
  );
};

export default SkeletonPaymentMethodIcons;
