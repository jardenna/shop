import { CartItem } from '../../../app/api/apiTypes/cartApiTypes';

interface CartListProps {
  cartList: CartItem[];
}

const CartList = ({ cartList }: CartListProps) => (
  <ul>
    {cartList.map((cart) => (
      <li key={cart.id}>
        <article>
          <div>dd</div>
          <div> {cart.productId}</div>
        </article>
      </li>
    ))}
  </ul>
);

export default CartList;
