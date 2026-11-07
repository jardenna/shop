import { Link } from 'react-router';
import { BaseOrder } from '../../../../app/api/apiTypes/cartApiTypes';
import Img from '../../../../components/Img';
import LabelValue from '../../../../components/LabelValue';
import { ShopPath } from '../../../../layout/nav/enums';
import { Language } from '../../../../types/types';
import { translateKey } from '../../../../utils/utils';
import ProductPrice from '../../../shop/components/productPrice/ProductPrice';
import './_order-list.scss';

interface Order extends BaseOrder {
  discount: number;
  id: string;
  image: string;
  price: number;
  productName: string;
}

interface OrderListProps {
  language: Language;
  orders: Order[];
  hidePrice?: boolean;
}

const OrderList = ({ orders, language, hidePrice }: OrderListProps) => (
  <ul className="order-list">
    {orders.map((order) => (
      <li className="order-list-item" key={order.id}>
        <article className="order-cart">
          <Link to={`${ShopPath.AllProducts}/${order.productId}`}>
            <Img src={order.image} alt="" className="order-img" />
          </Link>

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
