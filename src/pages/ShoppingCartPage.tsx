import { skipToken } from '@reduxjs/toolkit/query';
import { useAuth } from '../features/auth/hooks/useAuth';
import { useGetGuestCartQuery } from '../features/cart/cartApiSlice';
import CartList from '../features/cart/components/CartList';
import { useActiveCart } from '../features/cart/useActiveCart';
import MainPageContainer from './pageContainer/MainPageContainer';

const ShoppingCartPage = () => {
  const { currentUser } = useAuth();
  const { apiCartList, productIds } = useActiveCart();
  const { data: guestCart } = useGetGuestCartQuery(
    !currentUser ? productIds : skipToken,
  );
  const cartItems = currentUser ? apiCartList?.cartItems : guestCart?.products;

  return (
    <MainPageContainer heading="shopCart">
      <div className="flex">
        <section>
          {!cartItems ? <div>hello</div> : <CartList cartList={cartItems} />}
        </section>
        <section>Card</section>
      </div>
    </MainPageContainer>
  );
};

export default ShoppingCartPage;
