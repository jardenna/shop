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
          <article className="cart-list-item">
            <div>
              <Img src={cart.image} alt="" className="cart-list-img" />
            </div>
            <div>
              <div>{cart.id}</div>
              <div>{cart.id}</div>
            </div>
            <div>
              <div>{cart.id}</div>
              <div>{cart.id}</div>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
};

export default CartList;
