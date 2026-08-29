import Skeleton from '../Skeleton';
import SkeletonButtonList from '../SkeletonButtonList';
import SkeletonHeading from '../SkeletonHeading';
import SkeletonList from '../SkeletonList';
import SkeletonProgress from '../skeletonProgress/SkeletonProgress';
import './_skeleton-order-page.scss';
import SkeletonAddressList from './SkeletonAddressList';
import SkeletonPriceCol from './SkeletonPriceCol';
import SkeletonSummeryItem from './SkeletonSummeryItem';

const SkeletonAdminOrderDetailsPage = () => (
  <div className="skeleton-order-page admin-detail">
    <span className="skeleton-sub-header">
      <Skeleton className="skeleton-sub-header-title" height="1" />
    </span>
    <SkeletonProgress />
    <div>
      <SkeletonHeading width="16" />
      <SkeletonList count={5} className="flex-column" height="1" />
    </div>

    <div className="skeleton-content-row">
      <SkeletonSummeryItem />
      <SkeletonPriceCol />
    </div>
    <div>
      <SkeletonHeading width="14" />
      <div className="order-bottom-row">
        <SkeletonAddressList count={1} />
        <SkeletonAddressList />
      </div>
    </div>
    <SkeletonButtonList />
  </div>
);

export default SkeletonAdminOrderDetailsPage;
