import SkeletonProgress from '../skeletonProgress/SkeletonProgress';
import './_skeleton-order-page.scss';
import SkeletonSummeryItem from './SkeletonSummeryItem';

const SkeletonOrderPage = () => (
  <div className="confirmation-content">
    <SkeletonProgress />

    <div className="content-row">
      <SkeletonSummeryItem />

      <div className="price-col">
        <div className="price-box">
          <div className="section-title skeleton" />

          <div className="price-line">
            <div className="skeleton label-skeleton" />
            <div className="skeleton value-skeleton" />
          </div>
          <div className="price-line">
            <div className="skeleton label-skeleton" />
            <div className="skeleton value-skeleton" />
          </div>
          <div className="price-line">
            <div className="skeleton label-skeleton" />
            <div className="skeleton value-skeleton" />
          </div>
          <div className="price-line">
            <div className="skeleton label-skeleton" />
            <div className="skeleton value-skeleton" />
          </div>

          <div className="price-total">
            <div className="skeleton label-skeleton" />
            <div className="skeleton value-skeleton" />
          </div>
        </div>
      </div>
    </div>

    <div className="bottom-row">
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

      <div className="addresses">
        <div className="address-box">
          <div className="overview-label skeleton" />
          <div className="address-lines">
            <div className="skeleton line-name" />
            <div className="skeleton line-street" />
            <div className="skeleton line-city" />
            <div className="skeleton line-country" />
          </div>
        </div>

        <div className="address-box">
          <div className="overview-label skeleton" />
          <div className="address-lines">
            <div className="skeleton line-name" />
            <div className="skeleton line-street" />
            <div className="skeleton line-city" />
            <div className="skeleton line-country" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SkeletonOrderPage;
