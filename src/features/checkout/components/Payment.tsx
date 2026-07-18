import { PaymentMethod } from '../../../app/api/apiTypes/shopApiTypes';

interface PaymentProps {
  paymentMethod: PaymentMethod[];
}

const Payment = ({ paymentMethod }: PaymentProps) => {
  console.log(paymentMethod);

  return (
    <section>
      <h2 className="checkout-title">Payment</h2>Radio
      <ul>
        {paymentMethod.map((payment) => (
          <li key={payment.id}>
            {payment.label}
            {payment.label.toLowerCase() === 'visa' && (
              <div>
                {payment.fields.map((a) => (
                  <div key={a.label}>{a.label} </div>
                ))}
                hello
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Payment;
