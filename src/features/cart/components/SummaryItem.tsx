import ProductPrice from '../../shop/components/productPrice/ProductPrice';

interface SummaryItemProps {
  label: string;
  price: number;
  isDiscount?: boolean;
}

const SummaryItem = ({ label, price, isDiscount }: SummaryItemProps) => (
  <div className={`summary-item  ${isDiscount ? 'discount' : ''}`}>
    <span>{label}</span>
    <span className="summary-info">
      <ProductPrice price={price} isNegativeNumber={isDiscount} />
    </span>
  </div>
);

export default SummaryItem;
