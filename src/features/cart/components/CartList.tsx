import { CartProduct } from '../../../app/api/apiTypes/cartApiTypes';
import Img from '../../../components/Img';

interface CartListProps {
  cartList: CartProduct[];
}

const CartList = ({ cartList }: CartListProps) => {
  console.log(cartList);

  return (
    <ul>
      {cartList.map((cart) => (
        <li key={cart.productId}>
          <article>
            <div>
              <Img src={cart.image} alt="" />
            </div>
            <div>{cart.productId}</div>
          </article>
        </li>
      ))}
    </ul>
  );
};

export default CartList;
