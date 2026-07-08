import { CartProduct } from '../../../app/api/apiTypes/cartApiTypes';
import Img from '../../../components/Img';
import { ShopPath } from '../../../layout/nav/enums';
import { useLanguage } from '../../language/useLanguage';
import EmptyState from '../../shop/components/emptyState/EmptyState';
import './_cart-list.scss';

interface CartListProps {
  cartList: CartProduct[];
}

const CartList = ({ cartList }: CartListProps) => {
  const { language } = useLanguage();

  if (cartList.length === 0) {
    return (
      <EmptyState
        noProductText={language.shoppingBagEmpty}
        noProductTitle={language.shoppingBagEmptyTitle}
        src="/images/shoppingBags/shopping_bag_2"
        linkTo={`/${ShopPath.Collection}`}
        emtyStateCtaText={language.getInspired}
      />
    );
  }

  return (
    <ul className="cart-list">
      {cartList.map((cart) => (
        <li key={cart.id}>
          <article className="cart-item">
            <div className="cart-item-image">
              <Img src={cart.image} alt="" className="cart-item-img" />
            </div>

            <div className="cart-item-content">
              <h2 className="cart-item-title">{cart.id}</h2>

              <div className="cart-item-meta">
                <span>{cart.id}</span>
                <span>{cart.id}</span>
              </div>

              <div className="quantity">{cart.id}</div>

              <div className="actions">{cart.id}</div>

              <div className="price-group">
                <span>{cart.id}</span>
                <span>{cart.id}</span>
              </div>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
};

export default CartList;
