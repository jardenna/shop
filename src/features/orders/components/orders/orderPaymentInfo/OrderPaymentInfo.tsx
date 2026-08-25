import './_order-payment-method.scss';

interface OrderPaymentInfoProps {
  label: string;
  paymentMethod: string;
}

const OrderPaymentInfo = ({ paymentMethod, label }: OrderPaymentInfoProps) => (
  <div className="order-payment-info">
    <span>{label}</span>
    <span>{paymentMethod}</span>
  </div>
);

export default OrderPaymentInfo;
