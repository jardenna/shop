import Skeleton, { PickedSkeletonTypes } from '../Skeleton';

const SkeletonAddressList = ({ count = 2 }: PickedSkeletonTypes) => {
  const skeletons = Array.from({ length: count });

  return (
    <span className="addresses">
      {skeletons.map((_, index) => (
        <div className="address-box" key={index}>
          <div className="overview-label skeleton" />
          <div className="address-lines">
            <Skeleton count={4} width="7.5" />
          </div>
        </div>
      ))}
    </span>
  );
};

export default SkeletonAddressList;
