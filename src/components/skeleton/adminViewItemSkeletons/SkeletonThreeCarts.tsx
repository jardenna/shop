import Skeleton from '../Skeleton';
import SkeletonAdminPage from '../SkeletonAdminPage';
import SkeletomProductCartCenter from './SkeletomProductCartCenter';
import SkeletomProductCartLeft from './SkeletomProductCartLeft';

const SkeletonThreeCarts = () => (
  <SkeletonAdminPage variant="large" showLink>
    <div className="three-col">
      <SkeletomProductCartLeft />
      <SkeletomProductCartCenter />
      <div className="skeleton-cart-right">
        <Skeleton />
      </div>
    </div>
  </SkeletonAdminPage>
);

export default SkeletonThreeCarts;
