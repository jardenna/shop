import Icon from '../../../components/icons/Icon';
import { orderTrackingList } from '../createTrackingList';

interface OrderTrackingProps {
  language: Record<string, string>;
}

const OrderTracking = ({ language }: OrderTrackingProps) => (
  <section>
    <ul>
      {orderTrackingList.map(({ id, label, iconName }) => (
        <li key={id}>
          <p>{language[label]}</p>
          <Icon iconName={iconName} />
        </li>
      ))}
    </ul>
  </section>
);

export default OrderTracking;
