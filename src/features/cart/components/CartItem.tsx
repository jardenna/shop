import { CartProduct } from '../../../app/api/apiTypes/cartApiTypes';
import DeleteItem from '../../../components/deleteItem/DeleteItem';
import FavoriteHeart from '../../../components/favorites/FavoriteHeart';
import NumberStep from '../../../components/formElements/numberStep/NumberStep';
import Img from '../../../components/Img';
import { ChangeInputType } from '../../../types/types';
import { translateKey } from '../../../utils/utils';
import ProductPrice from '../../shop/components/productPrice/ProductPrice';
import { ProductQuantityMap } from './CartList';

interface CartItemProps {
  cart: CartProduct;
  language: Record<string, string>;
  quantityByProductId: ProductQuantityMap;
  value: number;
  onChange: (event: ChangeInputType) => void;
  onDeleteCartItem: (cartItemId: string) => void;
  onNumberStepChange: (field: string, amount: number) => void;
}

const CartItem = ({
  cart,
  language,
  quantityByProductId,
  value,
  onChange,
  onNumberStepChange,
  onDeleteCartItem,
}: CartItemProps) => (
  <article className="cart-item">
    <Img src={cart.image} alt="" className="cart-item-image" />
    <h2 className="cart-item-title">{cart.productName}</h2>
    <div className="price-group">
      <ProductPrice price={cart.price * value} discount={cart.discount} />
    </div>

    <div className="cart-item-meta">
      <span>
        {language.color}: {translateKey(cart.color, language)}
      </span>
      <span>
        {language.size}: {cart.size}
      </span>
    </div>

    <div className="quantity">
      <NumberStep
        onChange={onChange}
        onNumberStepChange={onNumberStepChange}
        value={value}
        min={1}
        max={cart.countInStock}
        labelText={language.quantity}
        id={cart.id}
        name={cart.id}
        disabled={quantityByProductId[cart.productId] === cart.countInStock}
      />
    </div>
    <div className="actions">
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
);

export default CartItem;
