import Skeleton, { PickedSkeletonTypes } from '../Skeleton';
import SkeletonBreadCrumbs from '../SkeletonBreadCrumbs';

import './_skeleton-collection-page.scss';
import SkeletonCollection from './SkeletonCollection';

const SkeletonCollectionPage = ({ count }: PickedSkeletonTypes) => (
  <div className="container">
    <div className="breadcrumb-row">
      <SkeletonBreadCrumbs width="12" />
    </div>
    <div className="collection-page-container">
      <div className="sidebar">
        <Skeleton className="sidebar-title" />

        <div className="nav-item active">
          <Skeleton className="nav-icon skeleton" />
          <Skeleton className="nav-label skeleton" width="7" />
        </div>
        <div className="nav-item">
          <Skeleton className="nav-icon skeleton" />
          <Skeleton className="nav-label skeleton" width="4" />
        </div>
        <div className="nav-item">
          <Skeleton className="nav-icon skeleton" />
          <Skeleton className="nav-label skeleton" width="5" />
        </div>
        <div className="nav-item">
          <Skeleton className="nav-icon skeleton" />
          <Skeleton className="nav-label skeleton" width="9" />
        </div>
      </div>

      <div className="hero-skeleton skeleton" />
    </div>
    <div className="toolbar">
      <div className="view-toggle">
        <Skeleton className="skeleton" />
        <Skeleton className="skeleton" />
      </div>

      <Skeleton className="results-label skeleton" />

      <Skeleton className="filter-btn skeleton" />
    </div>
    <div className="product-grid">
      <SkeletonCollection count={count} />
    </div>{' '}
  </div>
);

export default SkeletonCollectionPage;
