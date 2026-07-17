import { Discount, Summary } from '../../../app/api/apiTypes/sharedApiTypes';
import ProductPrice from '../../shop/components/productPrice/ProductPrice';
import { createSummaryItems } from '../../utils/createSummaryItems';
import './cartSummary.styles.scss';

interface CartSummaryProps {
  language: Record<string, string>;
  summary: Summary;
  promoDiscount?: Discount;
}

const CartSummary = ({
  summary,
  language,
  promoDiscount,
}: CartSummaryProps) => {
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

export default CartSummary;
