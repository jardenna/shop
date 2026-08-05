import { Order } from '../../../../app/api/apiTypes/cartApiTypes';
import Img from '../../../../components/Img';
import { translateKey } from '../../../../utils/utils';
import './_my-order.scss';

interface MyOrderItemProps {
  language: Record<string, string>;
  order: Order;
}

const MyOrderItem = ({ order, language }: MyOrderItemProps) => (
  <div className="my-order-item">
    <Img src={order.image} alt="" className="my-order-img" />
    <section>
      <h2>{order.productName}</h2>

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
);

export default MyOrderItem;
