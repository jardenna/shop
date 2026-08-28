import { paymentMethodLabels } from '../../../../app/api/apiConstants';
import { PaymentMethods } from '../../../../app/api/apiTypes/paymentApiTypes';
import { formatOrderNumber } from '../../../../utils/formatOrderNo';
import { useLanguage } from '../../../language/useLanguage';
import OrderHeading from '../orderHeading/OrderHeading';
import MyOrderDetailItem from './MyOrderDetailItem';
import './_confirmation-details.scss';

interface MyOrderDetailListProp {
  createdAt: Date;
  id: string;
  method: PaymentMethods;
}

const MyOrderDetailList = ({
  createdAt,
  method,
  id,
}: MyOrderDetailListProp) => {
  const { language } = useLanguage();

  return (
    <article className="confirmation-info">
      <OrderHeading variant="underline" heading={language.orderSummary} />
      <ul className="confirmation-detail-list">
        <MyOrderDetailItem
          text={formatOrderNumber(id)}
          label={language.orderNumber}
        />
        <MyOrderDetailItem date={createdAt} label={language.orderCreated} />
        <MyOrderDetailItem
          text={paymentMethodLabels[method]}
          label={language.paymentMethod}
        />
      </ul>
    </article>
  );
};

export default MyOrderDetailList;
