import Skeleton, { PickedSkeletonTypes } from './Skeleton';

const SkeletonProgress = ({ count = 4 }: PickedSkeletonTypes) => {
  const skeletons = Array.from({ length: count });

  return (
    <ul className="progress">
      {skeletons.map((_, index) => (
        <>
          <li className="step" key={index}>
            <Skeleton className="step-circle" />
            <Skeleton className="step-label" />
          </li>
          <li className="step-line" />
        </>
      ))}
    </ul>
  );
};

export default SkeletonProgress;
