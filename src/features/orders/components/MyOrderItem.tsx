import { Order } from '../../../app/api/apiTypes/cartApiTypes';
import Button from '../../../components/Button';
import Img from '../../../components/Img';
import { translateKey } from '../../../utils/utils';
import ProductPrice from '../../shop/components/productPrice/ProductPrice';

interface MyOrderItemProps {
  language: Record<string, string>;
  order: Order;
}

const MyOrderItem = ({ order, language }: MyOrderItemProps) => (
  <article className="my-order-item">
    <div>
      <div>
        <p>{language.orderNumber}</p>
        <p>{`# ${order.id}`}</p>
      </div>
      <ProductPrice price={order.price} />
    </div>

    <Img src={order.image} alt="" className="order-img" />
    <h2>{order.productName}</h2>
    <div className="badge">
      In transit Preparing Shipped Closed Behandles Leveret Afsendt
    </div>
    <span>
      {language.color}: {translateKey(order.color, language)}
    </span>
    <span>
      {language.size}: {order.size}
    </span>
    <span>
      {language.qty}: {order.qty}
    </span>
    <div>Estimated delivery: Oct 24, 2026 </div>
    <Button>Vis detaljer </Button>
  </article>
);

export default MyOrderItem;
