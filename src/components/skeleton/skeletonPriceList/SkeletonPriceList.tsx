import SkeletonPriceItem from './SkeletonPriceItem';
import './_skeleton-price-list.scss';

const SkeletonPriceList = () => (
  <span>
    <SkeletonPriceItem />
    <span className="skeleton-summary-total">
      <SkeletonPriceItem count={1} />
    </span>
  </span>
);

export default SkeletonPriceList;
