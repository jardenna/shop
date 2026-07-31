import Icon from '../../../components/icons/Icon';
import { IconName } from '../../../types/enums';

interface OrderTrackingProps {
  language: Record<string, string>;
}

const OrderTracking = ({ language }: OrderTrackingProps) => (
  <section>
    <div>
      <p>{language.orderCreated}</p>
      <Icon iconName={IconName.Basket} />
    </div>
    <div>
      <p>{language.orderInProgress}</p>
      <Icon iconName={IconName.PackageOpen} />
    </div>
    <div>
      <p>{language.orderShipped}</p>
      <Icon iconName={IconName.Deliver} />
    </div>
    <div>
      <p>{language.orderDelivered}</p>
      <Icon iconName={IconName.Home} />
    </div>
  </section>
);

export default OrderTracking;
