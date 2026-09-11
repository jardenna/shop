import Skeleton from '../Skeleton';
import SkeletonBadge from '../SkeletonBadge';
import SkeletonParagraph from '../SkeletonParagraph';
import SkeletonPriceItem from '../skeletonPriceList/SkeletonPriceItem';

const SkeletomProductCartLeft = () => (
  <div className="flex flex-column">
    <Skeleton height="12" />
    <div className="flex">
      <SkeletonParagraph height="1.5" count={1} />
      <SkeletonBadge />
    </div>
    <SkeletonParagraph />
    <SkeletonPriceItem count={1} />
  </div>
);

export default SkeletomProductCartLeft;
