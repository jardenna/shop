import Skeleton from '../Skeleton';
import SkeletonAdminPage from '../SkeletonAdminPage';
import SkeletonControlList from '../SkeletonControlList';
import SkeletonGrid from '../SkeletonGrid';
import SkeletomProductCartLeft from './SkeletomProductCartLeft';

const SkeletonThreeCarts = () => (
  <SkeletonAdminPage variant="large" showLink>
    <div className="three-col">
      <SkeletomProductCartLeft />
      <div className="flex flex-column  flex-1">
        <SkeletonGrid />
        <SkeletonControlList count={4} />
        <SkeletonControlList count={5} variant="medium" />
      </div>
      <div className="skeleton-cart-right">
        <Skeleton />
      </div>
    </div>
  </SkeletonAdminPage>
);

export default SkeletonThreeCarts;
