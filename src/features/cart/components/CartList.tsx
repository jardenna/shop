import { CartItem } from '../../../app/api/apiTypes/cartApiTypes';

interface CartListProps {
  cartList: CartItem[];
}

const CartList = ({ cartList }: CartListProps) => {
  console.log(cartList);

  return (
    <ul>
      {cartList.map((cart) => (
        <li key={cart.productId}>
          <article>
            <div>dd</div>
            <div>{cart.productId}</div>
          </article>
        </li>
      ))}
    </ul>
  );
};

export default CartList;
