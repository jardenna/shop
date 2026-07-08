import { skipToken } from '@reduxjs/toolkit/query';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import SkeletonCard from '../components/skeleton/SkeletonCard';
import { useAuth } from '../features/auth/hooks/useAuth';
import { useGetGuestCartQuery } from '../features/cart/cartApiSlice';
import CartList from '../features/cart/components/CartList';
import { useActiveCart } from '../features/cart/useActiveCart';
import MainPageContainer from './pageContainer/MainPageContainer';
import './ShoppingCartPage.styles.scss';

const ShoppingCartPage = () => {
  const { currentUser, isAuthReady } = useAuth();
  const { apiCartList, productIds } = useActiveCart({
    currentUser,
    isAuthReady,
  });
  const { data: guestCart, refetch } = useGetGuestCartQuery(
    !currentUser ? productIds : skipToken,
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
              <CartList cartList={cartItems} />
            </ErrorBoundary>
          )}
        </section>
        <section>Card</section>
      </div>
    </MainPageContainer>
  );
};

export default ShoppingCartPage;
