import { CartProduct } from '../../../app/api/apiTypes/cartApiTypes';
import { useFormValidation } from '../../../hooks/useFormValidation';
import './_cart-list.scss';
import CartItem from './CartItem';

export interface ProductQuantityMap {
  [productId: string]: number;
}

interface CartListProps {
  cartList: CartProduct[];
  language: Record<string, string>;
  onDeleteCartItem: (cartItemId: string) => void;
}

const CartList = ({ language, cartList, onDeleteCartItem }: CartListProps) => {
  const initialState = Object.fromEntries(
    cartList.map((cart) => [cart.id, cart.qty]),
  );

  const { onChange, onNumberStepChange, values } = useFormValidation({
    initialState,
  });

  const quantityByProductId = cartList.reduce<ProductQuantityMap>(
    (result, cartItem) => {
      // eslint-disable-next-line no-param-reassign
      result[cartItem.productId] =
        (result[cartItem.productId] ?? 0) + values[cartItem.id];

      return result;
    },
    {},
  );

  return (
    <ul className="cart-list">
      {cartList.map((cart) => (
        <li key={cart.id} className="cart-list-item">
          <CartItem
            cart={cart}
            language={language}
            quantityByProductId={quantityByProductId}
            value={values[cart.id]}
            onDeleteCartItem={() => {
              onDeleteCartItem(cart.id);
            }}
            onNumberStepChange={onNumberStepChange}
            onChange={onChange}
          />
        </li>
      ))}
    </ul>
  );
};

export default CartList;
