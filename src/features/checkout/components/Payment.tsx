import { PaymentMethod } from '../../../app/api/apiTypes/shopApiTypes';

interface PaymentProps {
  paymentMethod: PaymentMethod[];
}

const Payment = ({ paymentMethod }: PaymentProps) => {
  console.log(paymentMethod);

  return (
    <section>
      <h2 className="checkout-title">Payment</h2>
      <div>
        <div>h</div>
        <div>c</div>
        <div>j</div>
        <div>f</div>
        <div>f</div>
      </div>
    </section>
  );
};

export default Payment;
