import { Language } from '../../../../types/types';
import ProductPrice from '../../../shop/components/productPrice/ProductPrice';

interface PaymentSummaryItemProps {
  label: string;
  language: Language;
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
  language,
}: PaymentSummaryItemProps) => (
  <div
    className={`payment-summary-item   ${isDiscount ? 'discount' : ''} ${className}`}
  >
    <span>
      {label.includes('employeeDiscount') ? language.employeeDiscount : label}
    </span>
    <span className="payment-summary-info">
      <ProductPrice
        price={price}
        isNegativeNumber={isDiscount}
        cancelled={cancelled}
      />
    </span>
  </div>
);

export default PaymentSummaryItem;
