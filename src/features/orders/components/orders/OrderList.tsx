import { BaseOrder } from '../../../../app/api/apiTypes/cartApiTypes';
import Img from '../../../../components/Img';
import LabelValue from '../../../../components/LabelValue';
import { translateKey } from '../../../../utils/utils';
import ProductPrice from '../../../shop/components/productPrice/ProductPrice';

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
  showPrice?: boolean;
  variant?: string;
}

const OrderList = ({
  orders,
  language,
  showPrice,
  variant = '',
}: OrderListProps) => (
  <ul className={`order-list ${variant}`}>
    {orders.map((order) => (
      <li className="order-list-item" key={order.id}>
        <div className="order-item">
          <Img src={order.image} alt="" className="order-img" />
          <div>
            <h2 className="order-item-title">{order.productName}</h2>
            {showPrice && (
              <ProductPrice price={order.price} discount={order.discount} />
            )}
            <div className="new-order-meta">
              <LabelValue
                label={language.color}
                text={translateKey(order.color, language)}
              />
              <LabelValue label={language.size} text={order.size} />
              <LabelValue label={language.qty} text={order.qty} />
            </div>
          </div>
        </div>
      </li>
    ))}
  </ul>
);

export default OrderList;
