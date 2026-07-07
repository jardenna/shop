import CartList from '../features/cart/components/CartList';
import { useActiveCart } from '../features/cart/useActiveCart';
import { useLanguage } from '../features/language/useLanguage';
import EmptyState from '../features/shop/components/emptyState/EmptyState';
import { ShopPath } from '../layout/nav/enums';
import MainPageContainer from './pageContainer/MainPageContainer';

const ShoppingCartPage = () => {
  const { language } = useLanguage();

  const { activeCartList } = useActiveCart();
  console.log(activeCartList);

  return (
    <MainPageContainer heading="shopCart">
      <div>
        {activeCartList.length > 0 ? (
          <div className="flex">
            <section>
              <CartList cartList={activeCartList} />
            </section>
            <section>Card</section>
          </div>
        ) : (
          <EmptyState
            noProductText={language.shoppingBagEmpty}
            noProductTitle={language.shoppingBagEmptyTitle}
            src="/images/shoppingBags/shopping_bag_2"
            linkTo={`/${ShopPath.Collection}`}
            emtyStateCtaText={language.getInspired}
          />
        )}
      </div>
    </MainPageContainer>
  );
};

export default ShoppingCartPage;
