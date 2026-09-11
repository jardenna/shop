import Skeleton from '../Skeleton';
import SkeletonParagraph from '../SkeletonParagraph';
import SkeletonPriceItem from '../skeletonPriceList/SkeletonPriceItem';
import SkeletonAdminSubHeader from '../SkeletonSubHeader';

const SkeletomProductCartLeft = () => (
  <div className="skeleton-view-cart">
    <Skeleton height="9" />
    <SkeletonAdminSubHeader />
    <SkeletonParagraph />
    <SkeletonPriceItem count={1} />
  </div>
);

export default SkeletomProductCartLeft;
