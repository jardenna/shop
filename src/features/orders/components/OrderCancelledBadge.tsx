import Badge from '../../../components/badge/Badge';

interface OrderCancelledBadgeProps {
  language: Record<string, string>;
}

const OrderCancelledBadge = ({ language }: OrderCancelledBadgeProps) => (
  <Badge
    className="cancelled uppercase"
    variant="large"
    badgeText={language.orderCancelled}
  />
);

export default OrderCancelledBadge;
