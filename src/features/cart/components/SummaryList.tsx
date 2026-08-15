import { Discount, Summary } from '../../../app/api/apiTypes/sharedApiTypes';
import { createSummaryItemList } from '../../utils/createSummaryItemList';
import './cartSummary.styles.scss';
import SummaryItem from './SummaryItem';

interface SummaryListProps {
  language: Record<string, string>;
  promoDiscount: Discount;
  summary: Summary;
  cancelled?: boolean;
}

const SummaryList = ({
  summary,
  language,
  promoDiscount,
  cancelled,
}: SummaryListProps) => {
  const summaryItemList = createSummaryItemList({
    summary,
    discount: promoDiscount,
    language,
    cancelled,
  });

  return (
    <section className="summary-list">
      {summaryItemList.map(
        ({ label, price, className, isDiscount, cancelled }) => (
          <SummaryItem
            key={label}
            className={className}
            isDiscount={isDiscount}
            label={label}
            price={price}
            cancelled={cancelled}
          />
        ),
      )}
    </section>
  );
};

export default SummaryList;
