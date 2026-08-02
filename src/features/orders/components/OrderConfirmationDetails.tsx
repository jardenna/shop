import { PaymentMethods } from '../../../app/api/apiTypes/paymentApiTypes';
import DateDisplay from '../../../components/datePicker/DateDisplay';
import { useLanguage } from '../../language/useLanguage';

interface OrderConfirmationDetailsPropd {
  createdAt: Date;
  id: string;
  method: PaymentMethods;
}

const OrderConfirmationDetails = ({
  createdAt,
  method,
  id,
}: OrderConfirmationDetailsPropd) => {
  const { language } = useLanguage();
  return (
    <section>
      <h2>{language.orderSummary}</h2>

      {/* {confirmationDetailList.map((details) => (
        <div key={details.id}>
          <p>{details.label}</p>
        </div>
      ))} */}
      <div>
        <p>{language.orderNumber}</p>
        <p># {id}</p>
      </div>
      <div>
        <p>{language.orderPlaced}</p>
        <DateDisplay date={createdAt} />
      </div>
      <div>
        <p>{language.paymentMethod}</p>
        <p>{method}</p>
      </div>
    </section>
  );
};

export default OrderConfirmationDetails;
