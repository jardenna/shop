import './_order-method-info.scss';

interface OrderMethodInfoProps {
  label: string;
  paymentMethod: string;
}

const OrderMethodInfo = ({ paymentMethod, label }: OrderMethodInfoProps) => (
  <div className="order-method-info">
    <h2 className="order-method-label">{label}</h2>
    <span>{paymentMethod}</span>
  </div>
);

export default OrderMethodInfo;
