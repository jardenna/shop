import { Fragment } from 'react/jsx-runtime';
import Skeleton, { PickedSkeletonTypes } from '../Skeleton';
import './_skeleton-progress.scss';

const SkeletonProgress = ({ count = 4 }: PickedSkeletonTypes) => {
  const skeletons = Array.from({ length: count });

  return (
    <ul className="progress">
      {skeletons.map((_, index) => (
        <Fragment key={index}>
          <li className="step">
            <Skeleton className="step-circle" />
            <Skeleton className="step-label" />
          </li>
          <li className="step-line" />
        </Fragment>
      ))}
    </ul>
  );
};

export default SkeletonProgress;
