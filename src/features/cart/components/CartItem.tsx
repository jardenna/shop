import { Link } from 'react-router';
import { CartProduct } from '../../../app/api/apiTypes/cartApiTypes';
import DeleteItem from '../../../components/deleteItem/DeleteItem';
import FavoriteHeart from '../../../components/favorites/FavoriteHeart';
import NumberStep from '../../../components/formElements/numberStep/NumberStep';
import Img from '../../../components/Img';
import { ChangeInputType } from '../../../types/types';
import { minInStock, translateKey } from '../../../utils/utils';
import InStock from '../../shop/components/InStock';
import ProductPrice from '../../shop/components/productPrice/ProductPrice';
import { BaseCartProps, ProductQuantityMap } from './CartList';

interface CartItemProps extends BaseCartProps {
  cart: CartProduct;
  linkTo: string;
  quantityByProductId: ProductQuantityMap;
  value: number;
  onChange: (event: ChangeInputType) => void;
}

const CartItem = ({
  cart,
  language,
  quantityByProductId,
  value,
  onChange,
  onUpdateQty,
  onDeleteCartItem,
  linkTo,
}: CartItemProps) => (
  <article className="cart-item">
    <Link to={linkTo} className="cart-item-image">
      <Img src={cart.image} alt="" />
    </Link>
    <Link to={linkTo} className="cart-item-title">
      <h2>{cart.productName}</h2>
    </Link>

    <Link to={linkTo} className="price-group">
      <ProductPrice price={cart.price * value} discount={cart.discount} />
    </Link>

    <Link to={linkTo} className="cart-item-meta">
      <span>
        {language.color}: {translateKey(cart.color, language)}
      </span>
      <span>
        {language.size}: {cart.size}
      </span>
      {cart.countInStock < minInStock && (
        <span className="in-stock-container">
          <InStock stock={cart.countInStock} />
        </span>
      )}
    </Link>

    <div className="quantity">
      <NumberStep
        onChange={onChange}
        onNumberStepChange={onUpdateQty}
        value={value}
        min={1}
        max={cart.countInStock}
        labelText={language.quantity}
        id={cart.id}
        name={cart.id}
        readOnlyInput
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
