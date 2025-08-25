import Skeleton from '../Skeleton';
import SkeletonControlList from '../SkeletonControlList';

const SkeletonSinglePage = () => (
  <div className="flex">
    <Skeleton variant="img" />
    <div>
      <SkeletonControlList count={4} variant="large" />
      <SkeletonControlList count={5} />
    </div>
  </div>
);

export default SkeletonSinglePage;
