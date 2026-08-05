import { Order } from '../../../../app/api/apiTypes/cartApiTypes';
import Img from '../../../../components/Img';
import { translateKey } from '../../../../utils/utils';
import './_my-order-list.scss';

interface MyOrderListProps {
  language: Record<string, string>;
  orders: Order[];
}

const MyOrderList = ({ orders, language }: MyOrderListProps) => (
  <ul className="my-order-list">
    {orders.map((order) => (
      <li className="my-order-list-item" key={order.id}>
        <div className="my-order-item">
          <Img src={order.image} alt="" className="my-order-img" />
          <section>
            <h2 className="my-order-item-title">{order.productName}</h2>
            <div className="my-order-info">
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

export default MyOrderList;
