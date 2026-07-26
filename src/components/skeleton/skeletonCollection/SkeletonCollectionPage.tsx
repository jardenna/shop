import Skeleton, { PickedSkeletonTypes } from '../Skeleton';
import SkeletonCollection from './SkeletonCollection';

const SkeletonCollectionPage = ({ count }: PickedSkeletonTypes) => (
  <div className="collection-page-container">
    <span className="flex flex-column">
      <Skeleton count={4} />
    </span>
    <div>
      <Skeleton />
      <SkeletonCollection count={count} />
    </div>
  </div>
);

export default SkeletonCollectionPage;
