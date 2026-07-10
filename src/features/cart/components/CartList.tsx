import { CartProduct } from '../../../app/api/apiTypes/cartApiTypes';
import DeleteItem from '../../../components/DeleteItem';
import FavoriteHeart from '../../../components/favorites/FavoriteHeart';
import NumberStep from '../../../components/formElements/numberStep/NumberStep';
import Img from '../../../components/Img';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { translateKey } from '../../../utils/utils';
import ProductPrice from '../../shop/components/productPrice/ProductPrice';
import './_cart-list.scss';

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

  const quantityByProductId = cartList.reduce<Record<string, number>>(
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
          <article className="cart-item">
            <Img src={cart.image} alt="" className="cart-item-image" />
            <h2 className="cart-item-title">{cart.productName}</h2>
            <div className="price-group">
              <ProductPrice price={cart.price} discount={cart.discount} />
            </div>

            <div className="cart-item-meta">
              <span>{translateKey(cart.color, language)}</span>
              <span>SIZE {cart.size}</span>
            </div>

            <div className="quantity">
              <NumberStep
                onChange={onChange}
                onNumberStepChange={onNumberStepChange}
                value={values[cart.id]}
                min={1}
                max={cart.countInStock}
                labelText={language.quantity}
                id={cart.id}
                name={cart.id}
                disabled={
                  quantityByProductId[cart.productId] === cart.countInStock
                }
              />
            </div>
            <div className="actions">
              {/* <IconBtn
                iconName={IconName.Trash}
                ariaLabel={`${language.delete} ${cart.productName}`}
                onClick={() => {
                  onDeleteCartItem(cart.id);
                }}
              /> */}
              <DeleteItem
                ariaLabel={`${language.delete} ${cart.productName}`}
                onDeleteItem={() => {
                  onDeleteCartItem(cart.id);
                }}
                itemName={cart.productName}
              />
              <FavoriteHeart id={cart.productId} />
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
};

export default CartList;
