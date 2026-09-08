import Skeleton, { PickedSkeletonTypes } from '../Skeleton';
import SkeletonBreadCrumbs from '../SkeletonBreadCrumbs';

import './_skeleton-collection-page.scss';
import SkeletonAsideNav from './SkeletonAsideNav';
import SkeletonCollection from './SkeletonCollection';
import SkeletonToolbar from './SkeletonToolbar';

const SkeletonCollectionPage = ({ count }: PickedSkeletonTypes) => (
  <div className="container">
    <div className="breadcrumb-row">
      <SkeletonBreadCrumbs width="12" />
    </div>
    <div className="skeleton-shop-product">
      <SkeletonAsideNav />
      <div className="skeleton-shop-product-content">
        <Skeleton className="skeleton-hero" />
        <SkeletonToolbar />
        <SkeletonCollection count={count} />
      </div>
    </div>
  </div>
);

export default SkeletonCollectionPage;
