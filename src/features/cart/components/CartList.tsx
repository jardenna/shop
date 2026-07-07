import { CartItem } from '../../../app/api/apiTypes/cartApiTypes';
import Img from '../../../components/Img';

interface CartListProps {
  cartList: CartItem[];
}

const CartList = ({ cartList }: CartListProps) => (
  <ul>
    {cartList.map((cart) => (
      <li key={cart.id}>
        <article>
          <Img src={cart.image} alt="" />
          {cart.id}
        </article>
      </li>
    ))}
  </ul>
);

export default CartList;
