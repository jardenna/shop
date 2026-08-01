import Icon from '../../../components/icons/Icon';
import { orderTrackingList } from '../utils/createTrackingList';

interface OrderTrackingProps {
  language: Record<string, string>;
}

const status = {
  status: 'shipped',
  deliveredAt: null,
};

const currentStatusIndex = orderTrackingList.findIndex(
  ({ id }) => id === status.status,
);

const OrderTracking = ({ language }: OrderTrackingProps) => (
  <section>
    <ul className="order-tracking-list">
      {orderTrackingList.map(({ id, label, iconName }, index) => (
        <li key={id} className="tracking-list-item">
          <span
            className={`tracking-list-icon ${index <= currentStatusIndex ? 'completed' : ''}`}
          >
            <Icon iconName={iconName} aria-hidden />
          </span>
          <p className="tracking-list-label">{language[label]}</p>
        </li>
      ))}
    </ul>
  </section>
);

export default OrderTracking;
