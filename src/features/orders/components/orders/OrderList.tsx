import { BaseOrder } from '../../../../app/api/apiTypes/cartApiTypes';
import Img from '../../../../components/Img';
import { translateKey } from '../../../../utils/utils';

export interface OrderItems extends BaseOrder {
  id: string;
  image: string;
  productName: string;
}

interface OrderListProps {
  language: Record<string, string>;
  orders: OrderItems[];
}

// eslint-disable-next-line no-warning-comments
// TODO
const OrderList = ({ orders, language }: OrderListProps) => (
  <ul className="order-list">
    {orders.map((order) => (
      <li className="order-list-item" key={order.id}>
        <div className="order-item">
          <Img src={order.image} alt="" className="order-img" />
          <section>
            <h2 className="order-item-title">{order.productName}</h2>
            <div className="order-info">
              <span>
                {language.color}: {translateKey(order.color, language)}
              </span>
              <span>
                {language.size}: {order.size}
              </span>
              <span>
                {language.qty}: {order.qty}
              </span>
            </div>
          </section>
        </div>
      </li>
    ))}
  </ul>
);

export default OrderList;
