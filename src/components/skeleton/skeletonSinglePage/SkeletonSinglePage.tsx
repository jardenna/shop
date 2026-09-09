import Skeleton from '../Skeleton';
import './_skeleton-single-page.scss';
import SkeletonSingleProductInfo from './SkeletonSingleProductInfo';

const SkeletonSinglePage = () => (
  <>
    <Skeleton className="skeleton-single-product-img" />
    <SkeletonSingleProductInfo />
  </>
);

export default SkeletonSinglePage;
