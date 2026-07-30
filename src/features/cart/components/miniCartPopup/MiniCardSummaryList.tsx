import SummaryItem from '../SummaryItem';

interface MiniCardSummaryListProps {
  language: Record<string, string>;
  promoDiscount: number;
  shippingPrice: number;
  totalPrice: number;
}

const MiniCardSummaryList = ({
  language,
  totalPrice,
  promoDiscount,
  shippingPrice,
}: MiniCardSummaryListProps) => (
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

export default MiniCardSummaryList;
