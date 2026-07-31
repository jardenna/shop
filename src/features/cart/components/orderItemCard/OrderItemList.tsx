import { Order } from '../../../../app/api/apiTypes/cartApiTypes';
import OrderItemCard from './OrderItemCard';

interface OrderItemListProps {
  language: Record<string, string>;
  orders: Order[];
}

const OrderItemList = ({ orders, language }: OrderItemListProps) => (
  <ul className="mini-cart-list">
    {orders.map((order) => (
      <li key={order.id} className="mini-cart-item">
        <OrderItemCard order={order} language={language} />
      </li>
    ))}
  </ul>
);

export default OrderItemList;
