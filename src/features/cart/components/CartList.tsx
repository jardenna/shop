import { CartProduct } from '../../../app/api/apiTypes/cartApiTypes';
import Img from '../../../components/Img';
import { ShopPath } from '../../../layout/nav/enums';
import { useLanguage } from '../../language/useLanguage';
import EmptyState from '../../shop/components/emptyState/EmptyState';

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
    <ul>
      {cartList.map((cart) => (
        <li key={cart.id}>
          <article>
            <div>
              <Img src={cart.image} alt="" />
            </div>
            <div>{cart.id}</div>
          </article>
        </li>
      ))}
    </ul>
  );
};

export default CartList;
