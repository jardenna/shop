import Skeleton from '../Skeleton';
import SummeryLine from '../summaryLine/SummeryLine';
import './_skeleton-price-list.scss';

const SkeletonPriceList = () => (
  <span>
    <SummeryLine />
    <span className="skeleton-summary-total">
      <Skeleton className="label-skeleton" />
      <Skeleton className="value-skeleton" />
    </span>
  </span>
);

export default SkeletonPriceList;
