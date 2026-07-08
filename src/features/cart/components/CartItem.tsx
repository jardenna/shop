import { CartProduct } from '../../../app/api/apiTypes/cartApiTypes';
import Img from '../../../components/Img';
import { translateKey } from '../../../utils/utils';
import ProductPrice from '../../shop/components/productPrice/ProductPrice';
import './_cart-list.scss';

interface CartItemProps {
  cartList: CartProduct[];
  language: Record<string, string>;
}

const CartItem = ({ language, cartList }: CartItemProps) =>
  cartList.map((cart) => (
    <div className="cart-item" key={cart.id}>
      <Img src={cart.image} alt="" className="cart-item-image" />

      <h3 className="cart-item-title">{cart.productName}</h3>

      <div className="price-group">
        <ProductPrice price={cart.price} discount={cart.discount} />
      </div>

      <div className="cart-item-meta">
        <span>{translateKey(cart.color, language)}</span>
        <span>SIZE {cart.size}</span>
      </div>

      <div className="quantity">
        <span>−</span>
        <span>{cart.qty}</span>
        <span>+</span>
      </div>

      <div className="actions">icon trash icon hart</div>
    </div>
  ));

export default CartItem;
