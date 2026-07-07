import { useGetGuestCartQuery } from '../features/cart/cartApiSlice';
import CartList from '../features/cart/components/CartList';
import { useActiveCart } from '../features/cart/useActiveCart';
import { useLanguage } from '../features/language/useLanguage';
import EmptyState from '../features/shop/components/emptyState/EmptyState';
import { ShopPath } from '../layout/nav/enums';
import MainPageContainer from './pageContainer/MainPageContainer';

const ShoppingCartPage = () => {
  const { language } = useLanguage();
  const productIds = ['6a08357409deac1184d4f84a', '6a08357309deac1184d4f832'];
  const { data: guestCard } = useGetGuestCartQuery(productIds);

  const { apiCartList } = useActiveCart();
  console.log(guestCard, apiCartList);
  return (
    <MainPageContainer heading="shopCart">
      <div>
        {apiCartList && apiCartList.cartItems.length > 0 ? (
          <div className="flex">
            <section>
              <CartList cartList={apiCartList.cartItems} />
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
