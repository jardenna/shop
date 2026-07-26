import Skeleton, { PickedSkeletonTypes } from '../Skeleton';
import SkeletonBreadCrumbs from '../SkeletonBreadCrumbs';
import SkeletonNavItem from '../SkeletonNavItem';

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
        <SkeletonNavItem className="active" width="7" />
        <SkeletonNavItem width="4" />
        <SkeletonNavItem width="5" />
        <SkeletonNavItem width="9" />
      </div>

      <Skeleton className="hero-skeleton" />
    </div>
    <div className="toolbar-skeleton">
      <div className="view-toggle">
        <Skeleton />
        <Skeleton />
      </div>

      <Skeleton className="results-label" />
      <Skeleton className="filter-btn" />
    </div>
    <div className="product-grid">
      <SkeletonCollection count={count} />
    </div>
  </div>
);

export default SkeletonCollectionPage;
