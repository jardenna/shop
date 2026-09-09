import SummeryLine from '../summaryLine/SummeryLine';
import './_skeleton-price-list.scss';

const SkeletonPriceList = () => (
  <span>
    <SummeryLine />

    <span className="skeleton-summary-total">
      <SummeryLine count={1} />
    </span>
  </span>
);

export default SkeletonPriceList;
