import ProductPrice from '../../../shop/components/productPrice/ProductPrice';

interface PaymentSummaryItemProps {
  label: string;
  price: number;
  cancelled?: boolean;
  className?: string;
  isDiscount?: boolean;
}

const PaymentSummaryItem = ({
  className = '',
  label,
  price,
  isDiscount,
  cancelled,
}: PaymentSummaryItemProps) => (
  <div className={`summary-item  ${isDiscount ? 'discount' : ''} ${className}`}>
    <span>{label}</span>
    <span className="summary-info">
      <ProductPrice
        price={price}
        isNegativeNumber={isDiscount}
        cancelled={cancelled}
      />
    </span>
  </div>
);

export default PaymentSummaryItem;
