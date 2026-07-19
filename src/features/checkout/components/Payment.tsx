import { PaymentMethod } from '../../../app/api/apiTypes/shopApiTypes';
import RadioBtnList from './paymentMethods/RadioBtnList';

interface PaymentProps {
  paymentMethod: PaymentMethod[];
}

const Payment = ({ paymentMethod }: PaymentProps) => (
  <section>
    <h2 className="checkout-title">Payment</h2> <RadioBtnList />
    <ul>
      {paymentMethod.map((payment) => (
        <li key={payment.id}>
          {payment.label}
          {payment.label.toLowerCase() === 'visa' && (
            <div>
              {payment.fields.map((field) => (
                <div key={field.label}>{field.label} </div>
              ))}
              line
            </div>
          )}
        </li>
      ))}
    </ul>
  </section>
);

export default Payment;
