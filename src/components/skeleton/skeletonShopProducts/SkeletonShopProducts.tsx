import Skeleton, { PickedSkeletonTypes } from '../Skeleton';
import SkeletonBreadCrumbs from '../SkeletonBreadCrumbs';

import './_skeleton-shop-products.scss';
import SkeletonAsideNav from './SkeletonAsideNav';
import SkeletonProductInfo from './SkeletonProductInfo';
import SkeletonToolbar from './SkeletonToolbar';

const SkeletonShopProducts = ({ count }: PickedSkeletonTypes) => (
  <div className="container">
    <div className="breadcrumb-row">
      <SkeletonBreadCrumbs width="12" />
    </div>
    <div className="skeleton-shop-product-container">
      <SkeletonAsideNav />
      <div className="skeleton-shop-product-content">
        <Skeleton className="skeleton-hero" />
        <SkeletonToolbar />
        <SkeletonProductInfo count={count} />
      </div>
    </div>
  </div>
);

export default SkeletonShopProducts;
