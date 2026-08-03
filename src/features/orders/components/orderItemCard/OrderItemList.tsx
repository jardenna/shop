import { Order } from '../../../../app/api/apiTypes/cartApiTypes';
import OrderItemCard from './OrderItemCard';

interface OrderItemListProps {
  language: Record<string, string>;
  orders: Order[];
}

const OrderItemList = ({ orders, language }: OrderItemListProps) => (
  <ul className="order-list">
    {orders.map((order) => (
      <li key={order.id} className="order-list-item">
        {order.id}
        <OrderItemCard order={order} language={language} />
      </li>
    ))}
  </ul>
);

export default OrderItemList;
