import './_order-payment-method.scss';

interface OrderPaymentInfoProps {
  label: string;
  paymentMethod: string;
}

const OrderPaymentInfo = ({ paymentMethod, label }: OrderPaymentInfoProps) => (
  <div className="order-payment-info">
    <h2 className="order-payment-label">{label}</h2>
    <span>{paymentMethod}</span>
  </div>
);

export default OrderPaymentInfo;
