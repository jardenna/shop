import { PickedSkeletonTypes } from '../Skeleton';
import SkeletonBreadCrumbs from '../SkeletonBreadCrumbs';

import './_skeleton-collection-page.scss';

const SkeletonCollectionPage = ({ count }: PickedSkeletonTypes) => (
  <div className="container">
    <div className="breadcrumb-row">
      <SkeletonBreadCrumbs width="12" />
    </div>

    <div className="collection-page-container">
      <div className="sidebar">
        <div className="sidebar-title skeleton" />
        <hr className="sidebar-divider" />

        <div className="nav-item active">
          <div className="nav-icon skeleton" />
          <div className="nav-label skeleton" style={{ width: '70px' }} />
        </div>
        <div className="nav-item">
          <div className="nav-icon skeleton" />
          <div className="nav-label skeleton" style={{ width: '50px' }} />
        </div>
        <div className="nav-item">
          <div className="nav-icon skeleton" />
          <div className="nav-label skeleton" style={{ width: '55px' }} />
        </div>
        <div className="nav-item">
          <div className="nav-icon skeleton" />
          <div className="nav-label skeleton" style={{ width: '110px' }} />
        </div>
      </div>

      <div className="hero-skeleton skeleton" />
    </div>

    <div className="toolbar">
      <div className="view-toggle">
        <div className="skeleton" />
        <div className="skeleton" />
      </div>

      <div className="results-label skeleton" />

      <div className="filter-btn skeleton" />
    </div>
    {count}
    <div className="product-grid">
      <div className="product-tile skeleton">
        <div className="heart-skeleton skeleton" />
      </div>
      <div className="product-tile skeleton">
        <div className="heart-skeleton skeleton" />
      </div>
    </div>
  </div>
);

export default SkeletonCollectionPage;
