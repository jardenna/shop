import { BaseOrder } from '../../../app/api/apiTypes/cartApiTypes';
import Img from '../../../components/Img';
import LabelValue from '../../../components/LabelValue';
import { translateKey } from '../../../utils/utils';
import ProductPrice from '../../shop/components/productPrice/ProductPrice';
import './_order-list.scss';

export interface OrderItems extends BaseOrder {
  discount: number;
  id: string;
  image: string;
  price: number;
  productName: string;
}

interface OrderListProps {
  language: Record<string, string>;
  orders: OrderItems[];
  hidePrice?: boolean;
}

const OrderList = ({ orders, language, hidePrice }: OrderListProps) => (
  <ul className="order-list">
    {orders.map((order) => (
      <li className="order-list-item" key={order.id}>
        <article className="order-cart">
          <Img src={order.image} alt="" className="order-img" />
          <div>
            <h2 className="order-item-title">{order.productName}</h2>
            {!hidePrice && (
              <ProductPrice price={order.price} discount={order.discount} />
            )}
            <div className="order-info-meta">
              <LabelValue
                label={language.color}
                text={translateKey(order.color, language)}
              />
              <LabelValue label={language.size} text={order.size} />
              <LabelValue label={language.qty} text={order.qty} />
            </div>
          </div>
        </article>
      </li>
    ))}
  </ul>
);

export default OrderList;
