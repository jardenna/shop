import { skipToken } from '@reduxjs/toolkit/query';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import SkeletonCard from '../components/skeleton/SkeletonCard';
import { useAuth } from '../features/auth/hooks/useAuth';
import { useGetGuestCartQuery } from '../features/cart/cartApiSlice';
import CartItem from '../features/cart/components/CartItem';
import { useActiveCart } from '../features/cart/useActiveCart';
import { useLanguage } from '../features/language/useLanguage';
import EmptyState from '../features/shop/components/emptyState/EmptyState';
import { ShopPath } from '../layout/nav/enums';
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

  if (!cartItems) {
    return <SkeletonCard />;
  }

  if (cartItems.length === 0) {
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
    <MainPageContainer heading="bag">
      <div className="cart-page">
        <section>
          <ErrorBoundary
            FallbackComponent={ErrorBoundaryFallback}
            onReset={() => refetch}
          >
            <CartItem cartList={cartItems} language={language} />
          </ErrorBoundary>
        </section>
        <section>Card</section>
      </div>
    </MainPageContainer>
  );
};

export default ShoppingCartPage;
