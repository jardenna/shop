import Badge from '../../../components/badge/Badge';
import { Language } from '../../../types/types';

interface OrderCancelledBadgeProps {
  language: Language;
}

const OrderCancelledBadge = ({ language }: OrderCancelledBadgeProps) => (
  <Badge
    className="cancelled uppercase"
    variant="large"
    badgeText={language.orderCancelled}
  />
);

export default OrderCancelledBadge;
