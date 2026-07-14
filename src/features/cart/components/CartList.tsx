import { Order } from '../../../app/api/apiTypes/cartApiTypes';
import VisuallyHidden from '../../../components/VisuallyHidden';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { ShopPath } from '../../../layout/nav/enums';
import './_cart-list.scss';
import CartItem from './CartItem';

export interface ProductQuantityMap {
  [productId: string]: number;
}

export interface BaseCartProps {
  language: Record<string, string>;
  onDeleteCartItem: (cartItemId: string) => void;
  onUpdateQty: (cartItemId: string, qty: number) => void;
}

interface CartListProps extends BaseCartProps {
  cartList: Order[];
}

const CartList = ({
  language,
  cartList,
  onDeleteCartItem,
  onUpdateQty,
}: CartListProps) => {
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
        result[cartItem.productId] + values[cartItem.id];

      return result;
    },
    {},
  );

  const handleUpdateQty = (cartItemId: string, value: number) => {
    const nextQuantity = values[cartItemId] + value;

    onNumberStepChange(cartItemId, value);
    onUpdateQty(cartItemId, nextQuantity);
  };

  return (
    <ul className="cart-list">
      {cartList.map((cart) => (
        <li key={cart.id} className="cart-list-item">
          <VisuallyHidden>
            {language.view} {cart.productName}
          </VisuallyHidden>
          <CartItem
            cart={cart}
            language={language}
            quantityByProductId={quantityByProductId}
            value={values[cart.id]}
            onDeleteCartItem={() => {
              onDeleteCartItem(cart.id);
            }}
            onUpdateQty={handleUpdateQty}
            onChange={onChange}
            linkTo={`${ShopPath.AllProducts}/${cart.productId}`}
          />
        </li>
      ))}
    </ul>
  );
};

export default CartList;
