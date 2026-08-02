import { Discount, Summary } from '../../../app/api/apiTypes/sharedApiTypes';
import { createSummaryItems } from '../../utils/createSummaryItems';
import './cartSummary.styles.scss';
import SummaryItem from './SummaryItem';

interface SummaryListProps {
  language: Record<string, string>;
  promoDiscount: Discount;
  summary: Summary;
}

const SummaryList = ({
  summary,
  language,
  promoDiscount,
}: SummaryListProps) => {
  const summaryItems = createSummaryItems({
    summary,
    discount: promoDiscount,
    language,
  });

  return (
    <section className="summary-list">
      {summaryItems.map(({ label, price, className, isDiscount }) => (
        <SummaryItem
          key={label}
          className={className}
          isDiscount={isDiscount}
          label={label}
          price={price}
        />
      ))}
    </section>
  );
};

export default SummaryList;
