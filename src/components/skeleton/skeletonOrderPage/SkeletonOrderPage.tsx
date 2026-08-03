import SkeletonProgress from '../skeletonProgress/SkeletonProgress';
import './_skeleton-order-page.scss';
import SkeletonAddressList from './SkeletonAddressList';
import SkeletonOverviewGroup from './SkeletonOverviewGroup';
import SkeletonPriceCol from './SkeletonPriceCol';
import SkeletonSummeryItem from './SkeletonSummeryItem';

const SkeletonOrderPage = () => (
  <div className="confirmation-content skeleton-order-page">
    <SkeletonProgress />

    <div className="content-row">
      <SkeletonSummeryItem />
      <SkeletonPriceCol />
    </div>

    <div className="confirmation-bottom-row">
      <SkeletonOverviewGroup />

      <SkeletonAddressList />
    </div>
  </div>
);

export default SkeletonOrderPage;
