import { Order } from '../../../app/api/apiTypes/cartApiTypes';
import Img from '../../../components/Img';
import LabelValueGrid from '../../../components/labelValueGrid/LabelValueGrid';
import { translateKey } from '../../../utils/utils';
import ProductPrice from '../../shop/components/productPrice/ProductPrice';

interface FavoriteCartItemProps {
  language: Record<string, string>;
  order: Order;
}

const FavoriteCartItem = ({ order, language }: FavoriteCartItemProps) => (
  <article className="favorite-panel-order">
    <Img src={order.image} alt="" className="panel-product-img" />
    <div>
      <h2 className="panel-product-title">{order.productName}</h2>
      <ProductPrice price={order.price} discount={order.discount} />
      <div>
        <LabelValueGrid text={language.color}>
          {translateKey(order.color, language)}
        </LabelValueGrid>
        <LabelValueGrid text={language.size}>{order.size}</LabelValueGrid>
        <LabelValueGrid text={language.qty}>{order.qty}</LabelValueGrid>
      </div>
    </div>
  </article>
);

export default FavoriteCartItem;
