import SummaryItem from '../paymentSummery/SummaryItem';

interface MiniCartSummaryListProps {
  language: Record<string, string>;
  promoDiscount: number;
  shippingPrice: number;
  totalPrice: number;
}

const MiniCartSummaryList = ({
  language,
  totalPrice,
  promoDiscount,
  shippingPrice,
}: MiniCartSummaryListProps) => (
  <div className="mini-cart-summary-list">
    <SummaryItem
      label={language.employeeDiscount}
      price={promoDiscount}
      isDiscount
    />
    <SummaryItem label={language.estimatedShipping} price={shippingPrice} />
    <SummaryItem label={language.orderTotalInclVat} price={totalPrice} />
  </div>
);

export default MiniCartSummaryList;
