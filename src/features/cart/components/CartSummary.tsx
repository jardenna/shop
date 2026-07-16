import { Summary } from '../../../app/api/apiTypes/sharedApiTypes';
import { vat } from '../../../utils/utils';
import ProductPrice from '../../shop/components/productPrice/ProductPrice';
import './cartSummary.styles.scss';

interface CartSummaryProps {
  language: Record<string, string>;
  summary: Summary;
  hideSummaryItem?: boolean;
}

const CartSummary = ({
  summary,
  language,
  hideSummaryItem,
}: CartSummaryProps) => {
  const summaryItems = [
    {
      label: language.subtotal,
      price: summary.subTotal,
    },
    summary.discountPrice > 0
      ? {
          label: language.discount,
          price: summary.discountPrice,
          className: 'summary-discount',
        }
      : null,
    {
      label: language.estimatedShipping,
      price: summary.shippingPrice,
    },
    {
      label: ` ${language.inclVat} (${vat}%)`,
      price: summary.taxPrice,
      hideSummaryItem,
    },
    {
      label: language.totalPrice,
      price: summary.totalPrice,
      className: 'summary-total',
    },
  ].filter((item) => item !== null);

  return (
    <section className="summary-list">
      {summaryItems.map(
        ({ label, price, className, hideSummaryItem }) =>
          !hideSummaryItem && (
            <div key={label} className={`summary-item ${className ?? ''}`}>
              <span>{label}</span>
              <span className="summary-info">
                <ProductPrice price={price} />
              </span>
            </div>
          ),
      )}
    </section>
  );
};
export default CartSummary;
