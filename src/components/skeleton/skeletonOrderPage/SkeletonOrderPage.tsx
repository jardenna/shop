import SkeletonProgress from '../skeletonProgress/SkeletonProgress';
import './_skeleton-order-page.scss';
import SkeletonAddressList from './SkeletonAddressList';
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
      <div className="overview-col">
        <div className="overview-title skeleton" />
        <hr className="overview-divider" />

        <div className="overview-group">
          <div className="overview-label skeleton" />
          <div className="overview-value skeleton" />
        </div>
        <div className="overview-group">
          <div className="overview-label skeleton" />
          <div className="overview-value skeleton" />
        </div>
        <div className="overview-group">
          <div className="overview-label skeleton" />
          <div className="overview-value skeleton" style={{ width: '120px' }} />
        </div>
      </div>

      <SkeletonAddressList />
    </div>
  </div>
);

export default SkeletonOrderPage;
