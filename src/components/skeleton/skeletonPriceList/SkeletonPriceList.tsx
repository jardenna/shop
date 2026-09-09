import SkeletonPriceItem from './SkeletonPriceItem';
import './_skeleton-price-list.scss';

const SkeletonPriceList = () => (
  <>
    <SkeletonPriceItem />
    <span className="skeleton-price-total">
      <SkeletonPriceItem count={1} />
    </span>
  </>
);

export default SkeletonPriceList;
