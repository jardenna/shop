import ProductPrice from '../../../shop/components/productPrice/ProductPrice';

interface SummaryItemProps {
  label: string;
  price: number;
  cancelled?: boolean;
  className?: string;
  isDiscount?: boolean;
}

const SummaryItem = ({
  className = '',
  label,
  price,
  isDiscount,
  cancelled,
}: SummaryItemProps) => (
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

export default SummaryItem;
