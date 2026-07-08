import { CartProduct } from '../../../app/api/apiTypes/cartApiTypes';
import { Size } from '../../../app/api/apiTypes/sharedApiTypes';
import Img from '../../../components/Img';
import './_cart-list.scss';

interface CartItemProps {
  cartList: CartProduct[];
  color?: string;
  originalPrice?: number;
  price?: number;
  qty?: number;
  size?: Size | '';
  title?: string;
}
const CartItem = ({
  title = 'ELITE PERFORMANCE TEE',
  color = 'GREY',
  size = 'M',
  originalPrice = 35.0,
  price = 28.0,
  qty = 1,
  cartList,
}: CartItemProps) =>
  cartList.map((cart) => (
    <div className="cart-item" key={cart.id}>
      <Img src={cart.image} alt={title} className="cart-item-image" />

      <h3 className="cart-item-title">{title}</h3>

      <div className="price-group">
        {originalPrice > price && (
          <span className="price-group-original">
            ${originalPrice.toFixed(2)}
          </span>
        )}
        <span className="price-group-current">${price.toFixed(2)}</span>
      </div>

      <div className="cart-item-meta">
        <span>{color}</span>
        <span>SIZE {size}</span>
      </div>

      <div className="quantity">
        <span>−</span>
        <span>{qty}</span>
        <span>+</span>
      </div>

      <div className="actions">icon trash icon hart</div>
    </div>
  ));

export default CartItem;
