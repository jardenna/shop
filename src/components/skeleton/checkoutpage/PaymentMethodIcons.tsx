import '../_skeleton.scss';
import Skeleton, { PickedSkeletonTypes } from '../Skeleton';
import './_style.scss';

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
