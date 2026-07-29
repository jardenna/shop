import { Discount, Summary } from '../../../app/api/apiTypes/sharedApiTypes';
import ProductPrice from '../../shop/components/productPrice/ProductPrice';
import { createSummaryItems } from '../../utils/createSummaryItems';
import './cartSummary.styles.scss';

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
        <div key={label} className={`summary-item ${className ?? ''}`}>
          <span>{label}</span>
          <span className="summary-info">
            <ProductPrice price={price} isNegativeNumber={isDiscount} />
          </span>
        </div>
      ))}
    </section>
  );
};

export default SummaryList;
