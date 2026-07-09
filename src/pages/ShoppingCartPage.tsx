import { skipToken } from '@reduxjs/toolkit/query';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import SkeletonCard from '../components/skeleton/SkeletonCard';
import { useAuth } from '../features/auth/hooks/useAuth';
import { useGetGuestCartQuery } from '../features/cart/cartApiSlice';
import CartItem from '../features/cart/components/CartItem';
import { useActiveCart } from '../features/cart/useActiveCart';
import { useLanguage } from '../features/language/useLanguage';
import MainPageContainer from './pageContainer/MainPageContainer';
import './ShoppingCartPage.styles.scss';

const ShoppingCartPage = () => {
  const { currentUser, isAuthReady } = useAuth();
  const { language } = useLanguage();
  const { apiCartList, cartList } = useActiveCart({
    currentUser,
    isAuthReady,
  });

  const shouldFetchGuestCart = isAuthReady && !currentUser;

  const { data: guestCart, refetch } = useGetGuestCartQuery(
    shouldFetchGuestCart ? cartList : skipToken,
  );

  const cartItems = currentUser ? apiCartList?.cartItems : guestCart?.products;

  return (
    <MainPageContainer heading="bag">
      <div className="cart-page">
        <section>
          {!cartItems ? (
            <SkeletonCard />
          ) : (
            <ErrorBoundary
              FallbackComponent={ErrorBoundaryFallback}
              onReset={() => refetch}
            >
              <CartItem cartList={cartItems} language={language} />
            </ErrorBoundary>
          )}
        </section>
        <section>Card</section>
      </div>
    </MainPageContainer>
  );
};

export default ShoppingCartPage;
