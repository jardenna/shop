import Skeleton, { PickedSkeletonTypes } from '../../Skeleton';

const PaymentMethodIcons = ({ count = 4 }: PickedSkeletonTypes) => {
  const skeletons = Array.from({ length: count });
  return (
    <>
      {skeletons.map((_, index) => (
        <span key={index}>
          <Skeleton />
        </span>
      ))}
    </>
  );
};

export default PaymentMethodIcons;
