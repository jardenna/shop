import { CartListResponse } from '../../../app/api/apiTypes/cartApiTypes';
import SkeletonList from '../../../components/skeleton/SkeletonList';

interface OrderSummaryListProps {
  isLoading: boolean;
  orderItems?: CartListResponse | null;
}

const OrderSummaryList = ({ orderItems, isLoading }: OrderSummaryListProps) => {
  if (isLoading) {
    return <SkeletonList />;
  }

  return (
    <section>
      {orderItems &&
        orderItems.cartItems.map((order) => (
          <div key={order.id}>{order.color}</div>
        ))}
    </section>
  );
};
export default OrderSummaryList;
