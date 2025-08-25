import Skeleton from '../Skeleton';
import SkeletonControlList from '../TempFile';

const SkeletonSinglePage = () => (
  <div className="flex">
    <Skeleton variant="img" />
    <div>
      <SkeletonControlList count={4} variant="large" />
      <SkeletonControlList count={5} variant="medium" />
    </div>
  </div>
);

export default SkeletonSinglePage;
