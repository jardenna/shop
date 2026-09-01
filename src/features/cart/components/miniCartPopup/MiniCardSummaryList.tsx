import PaymentSummaryItem from '../paymentSummery/PaymentSummaryItem';

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
  <div>
    <PaymentSummaryItem
      label={language.employeeDiscount}
      price={promoDiscount}
      isDiscount
    />
    <PaymentSummaryItem
      label={language.estimatedShipping}
      price={shippingPrice}
    />
    <PaymentSummaryItem label={language.orderTotalInclVat} price={totalPrice} />
  </div>
);

export default MiniCartSummaryList;
