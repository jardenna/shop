import Skeleton from './Skeleton';
import SkeletonAdminPage from './SkeletonAdminPage';
import SkeletonBadge from './SkeletonBadge';
import SkeletonControlList from './SkeletonControlList';
import SkeletonFooter from './SkeletonFooter';
import SkeletonGrid from './SkeletonGrid';
import SkeletonParagraph from './SkeletonParagraph';

const SkeletonThreeCarts = () => (
  <SkeletonAdminPage variant="large" showLink>
    <div className="flex">
      <div className=" flex-1">
        <div className="flex flex-column">
          <Skeleton height="12" />
          <div className="flex">
            <SkeletonParagraph height="1.5" count={1} />
            <SkeletonBadge />
          </div>
          <SkeletonParagraph />
          <SkeletonFooter />
        </div>
      </div>
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
