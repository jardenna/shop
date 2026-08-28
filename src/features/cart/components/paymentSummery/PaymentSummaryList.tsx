import { Discount, Summary } from '../../../../app/api/apiTypes/sharedApiTypes';
import { createSummaryItemList } from '../../../utils/createSummaryItemList';
import PaymentSummaryItem from './PaymentSummaryItem';
import './_payment-summary.scss';

interface PaymentSummaryListProps {
  language: Record<string, string>;
  promoDiscount: Discount;
  summary: Summary;
  cancelled?: boolean;
}

const PaymentSummaryList = ({
  summary,
  language,
  promoDiscount,
  cancelled,
}: PaymentSummaryListProps) => {
  const summaryItemList = createSummaryItemList({
    summary,
    discount: promoDiscount,
    language,
    cancelled,
  });

  return (
    <div className="summary-list">
      {summaryItemList.map(
        ({ label, price, className, isDiscount, cancelled }) => (
          <PaymentSummaryItem
            key={label}
            className={className}
            isDiscount={isDiscount}
            label={label}
            price={price}
            cancelled={cancelled}
          />
        ),
      )}
    </div>
  );
};

export default PaymentSummaryList;
